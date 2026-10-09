const bcrypt = require('bcryptjs');
const prisma = require('../src/config/db');
const seedRooms = require('./seed-rooms');
const seedBoardMaps = require('./seed-maps');
const seedQuestions = require('./seed-questions');

async function main() {
  console.log('🌱 Starting database seed...\n');

  // 1. Seed Rooms
  console.log('--- 1. Seeding Rooms ---');
  await seedRooms();

  // 2. Seed Board Maps
  console.log('\n--- 2. Seeding Board Maps ---');
  await seedBoardMaps();

  // 3. Seed Questions
  console.log('\n--- 3. Seeding Questions ---');
  await seedQuestions();

  // Helper for hashing passwords
  const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
  };

  const superPasswordHash = await hashPassword('super123');
  const adminPasswordHash = await hashPassword('admin123');
  const teamPasswordHash = await hashPassword('team123');

  // 4. Create 2 Super Admins
  console.log('\n--- 4. Seeding 2 Super Admins ---');
  const superadmins = ['SUPER001', 'SUPER002'];
  for (const username of superadmins) {
    await prisma.user.upsert({
      where: { username },
      update: {
        password: superPasswordHash,
        role: 'SUPERADMIN',
      },
      create: {
        username,
        password: superPasswordHash,
        role: 'SUPERADMIN',
      },
    });
    console.log(`✅ Superadmin created/updated: ${username} (password: super123)`);
  }

  // 5. Create 40 Admins
  console.log('\n--- 5. Seeding 40 Admins ---');
  for (let i = 1; i <= 40; i++) {
    const username = `ADMIN${String(i).padStart(3, '0')}`;
    await prisma.user.upsert({
      where: { username },
      update: {
        password: adminPasswordHash,
        role: 'ADMIN',
      },
      create: {
        username,
        password: adminPasswordHash,
        role: 'ADMIN',
      },
    });
    console.log(`✅ Admin created/updated: ${username} (password: admin123)`);
  }

  // 6. Create 40 Teams and Participant Logins
  console.log('\n--- 6. Seeding 40 Participant Teams ---');
  const allMaps = await prisma.boardMap.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } });
  const defaultMapId = allMaps.length > 0 ? allMaps[0].id : null;

  const teamNames = [
    'Team Alpha',
    'Team Bravo',
    'Team Charlie',
    'Team Delta',
    'Team Echo',
    'Team Foxtrot',
    'Team Golf',
    'Team Hotel',
    'Team India',
    'Team Juliet',
    'Team Kilo',
    'Team Lima',
    'Team Mike',
    'Team November',
    'Team Oscar',
    'Team Papa',
    'Team Quebec',
    'Team Romeo',
    'Team Sierra',
    'Team Tango',
    'Team Uniform',
    'Team Victor',
    'Team Whiskey',
    'Team X-ray',
    'Team Yankee',
    'Team Zulu',
    'Team Titan',
    'Team Phoenix',
    'Team Nexus',
    'Team Cyber',
    'Team Vortex',
    'Team Apex',
    'Team Quantum',
    'Team Falcon',
    'Team Shadow',
    'Team Viper',
    'Team Blaze',
    'Team Storm',
    'Team Cipher',
    'Team Pulse',
    'Team Aurora',
    'Team Comet',
    'Team Eclipse',
    'Team Galaxy',
    'Team Horizon',
    'Team Infinity',
    'Team Nebula',
    'Team Nova',
    'Team Orbit',
    'Team Polaris',
    'Team Pulsar',
    'Team Quasar',
    'Team Solar',
    'Team Spectre',
    'Team Stellar',
    'Team Zenith',
    'Team Chronos',
    'Team Genesis',
    'Team Matrix',
    'Team Odyssey',
  ];

  for (let i = 1; i <= 60; i++) {
    const teamCode = `TEAM${String(i).padStart(3, '0')}`;
    const teamName = teamNames[i - 1];
    const assignedRoom = 'AB1 307';
    const assignedMap = allMaps.length > 0 ? allMaps[(i - 1) % allMaps.length].id : defaultMapId;

    // Create or update Team
    const team = await prisma.team.upsert({
      where: { teamCode },
      update: {
        teamName,
        currentPosition: 1,
        currentRoom: assignedRoom,
        mapId: assignedMap,
        status: 'ACTIVE',
        canRollDice: true,
      },
      create: {
        teamCode,
        teamName,
        currentPosition: 1,
        currentRoom: assignedRoom,
        mapId: assignedMap,
        status: 'ACTIVE',
        canRollDice: true,
        totalTimeSec: 0,
        points: 0,
      },
    });

    // Create team members
    await prisma.teamMember.upsert({
      where: { id: `member-${teamCode}-1` },
      update: { teamId: team.id, name: `${teamName} Player 1` },
      create: {
        id: `member-${teamCode}-1`,
        name: `${teamName} Player 1`,
        teamId: team.id,
      },
    });

    await prisma.teamMember.upsert({
      where: { id: `member-${teamCode}-2` },
      update: { teamId: team.id, name: `${teamName} Player 2` },
      create: {
        id: `member-${teamCode}-2`,
        name: `${teamName} Player 2`,
        teamId: team.id,
      },
    });

    // Create or update Participant User
    await prisma.user.upsert({
      where: { username: teamCode },
      update: {
        password: teamPasswordHash,
        role: 'PARTICIPANT',
        teamId: team.id,
      },
      create: {
        username: teamCode,
        password: teamPasswordHash,
        role: 'PARTICIPANT',
        teamId: team.id,
      },
    });

    console.log(`✅ Team created/updated: ${teamCode} (${teamName}) (password: team123)`);
  }

  console.log('\n🎉 Database seed completed successfully!');
}

if (require.main === module) {
  main()
    .then(() => {
      process.exit(0);
    })
    .catch((e) => {
      console.error('❌ Seed failed:', e);
      process.exit(1);
    });
}

module.exports = main;
