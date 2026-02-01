const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const prisma = require('../src/config/db');
const {hashPassword} = require('../src/utils/password.util');

const MAP_CAPACITY = 10;

/* -------------------- helpers -------------------- */

async function getRoomUsage() {
  const rooms = await prisma.room.findMany();
  const roomCounts = await prisma.team.groupBy({
    by: ['currentRoom'],
    _count: {id: true},
    where: {status: 'ACTIVE'},
  });

  const usage = {};
  for (const room of rooms) {
    usage[room.roomNumber] = {
      capacity: room.capacity,
      used: 0,
    };
  }

  for (const rc of roomCounts) {
    if (usage[rc.currentRoom]) {
      usage[rc.currentRoom].used = rc._count.id;
    }
  }

  return usage;
}

async function getMapUsage() {
  const maps = await prisma.boardMap.findMany({
    where: {isActive: true},
    orderBy: {createdAt: 'asc'},
  });

  if (!maps.length) {
    throw new Error('No active maps available');
  }

  const mapCounts = await prisma.team.groupBy({
    by: ['mapId'],
    _count: {id: true},
    where: {mapId: {not: null}},
  });

  const usage = {};
  for (const map of maps) {
    usage[map.id] = {
      used: 0,
      map,
    };
  }

  for (const mc of mapCounts) {
    if (usage[mc.mapId]) {
      usage[mc.mapId].used = mc._count.id;
    }
  }

  return usage;
}

/* -------------------- main importer -------------------- */

async function importTeams() {
  const filePath = path.join(__dirname, 'Teams.csv');
  const rows = [];

  console.log('📥 Reading CSV...');

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  console.log(`Found ${rows.length} teams\n`);

  const roomUsage = await getRoomUsage();
  const mapUsage = await getMapUsage();

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const row of rows) {
    const teamCode = row.id?.toString().trim();
    const teamName = row.name?.toString().trim();
    const password = row.password?.toString();

    if (!teamCode || !password) {
      console.log(`⚠️ Skipping invalid row`, row);
      skipped++;
      continue;
    }

    const exists = await prisma.team.findUnique({
      where: {teamCode},
    });

    if (exists) {
      console.log(`⏭️ ${teamCode} already exists`);
      skipped++;
      continue;
    }

    try {
      // assign room
      let assignedRoom = null;
      for (const [room, info] of Object.entries(roomUsage)) {
        if (info.used < info.capacity) {
          assignedRoom = room;
          info.used++;
          break;
        }
      }

      if (!assignedRoom) {
        throw new Error('All rooms full');
      }

      // assign map
      let assignedMapId = null;
      for (const mapId in mapUsage) {
        if (mapUsage[mapId].used < MAP_CAPACITY) {
          assignedMapId = mapId;
          mapUsage[mapId].used++;
          break;
        }
      }

      if (!assignedMapId) {
        throw new Error('All maps at capacity');
      }

      const hashedPassword = await hashPassword(password);

      // 🔥 short, clean transaction
      await prisma.$transaction(async (tx) => {
        const team = await tx.team.create({
          data: {
            teamCode,
            teamName,
            currentRoom: assignedRoom,
            mapId: assignedMapId,
            members: {
              create: [
                {name: 'Member 1'},
                {name: 'Member 2'},
                {name: 'Member 3'},
              ],
            },
          },
        });

        await tx.user.create({
          data: {
            username: teamCode,
            password: hashedPassword,
            role: 'PARTICIPANT',
            teamId: team.id,
          },
        });
      });

      console.log(`✅ ${teamCode} (${teamName}) created`);
      success++;

    } catch (err) {
      console.error(`❌ Failed for ${teamCode}: ${err.message}`);
      failed++;
    }
  }

  console.log('\n📊 Import Summary');
  console.log(`✅ Success: ${success}`);
  console.log(`⏭️ Skipped: ${skipped}`);
  console.log(`❌ Failed: ${failed}`);

  await prisma.$disconnect();
}

/* -------------------- run -------------------- */

importTeams().catch(async (e) => {
  console.error('Fatal error:', e);
  await prisma.$disconnect();
});
