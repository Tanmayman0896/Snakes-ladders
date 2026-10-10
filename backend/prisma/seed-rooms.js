const prisma = require('../src/config/db');

const REVISED_ROOMS = [
  // FLOOR 2
  { roomNumber: 'AB1 210', capacity: 6, floor: 2, roomType: 'NON_TECH' },
  { roomNumber: 'AB1 228', capacity: 6, floor: 2, roomType: 'NON_TECH' },
  { roomNumber: 'AB1 229', capacity: 7, floor: 2, roomType: 'TECH' },

  // FLOOR 3
  { roomNumber: 'AB1 307', capacity: 65, floor: 3, roomType: 'NON_TECH' }, // Assembly / Start & Finish
  { roomNumber: 'AB1 309', capacity: 6, floor: 3, roomType: 'NON_TECH' },
  { roomNumber: 'AB1 310', capacity: 6, floor: 3, roomType: 'TECH' },
  { roomNumber: 'AB1 311', capacity: 6, floor: 3, roomType: 'TECH' },
  { roomNumber: 'AB1 312', capacity: 6, floor: 3, roomType: 'NON_TECH' },
];

async function seedRooms() {
  console.log('🌱 Seeding revised rooms...\n');

  const validRoomNumbers = REVISED_ROOMS.map(r => r.roomNumber);

  // 1. Reset any teams pointing to removed rooms back to starting room 'AB1 307'
  await prisma.team.updateMany({
    where: { currentRoom: { notIn: validRoomNumbers } },
    data: { currentRoom: 'AB1 307' },
  });

  // 2. Upsert the revised rooms
  for (const r of REVISED_ROOMS) {
    await prisma.room.upsert({
      where: { roomNumber: r.roomNumber },
      update: {
        capacity: r.capacity,
        floor: r.floor,
        roomType: r.roomType,
      },
      create: {
        roomNumber: r.roomNumber,
        capacity: r.capacity,
        floor: r.floor,
        roomType: r.roomType,
      },
    });
  }

  // 3. Remove old rooms that are no longer part of the event
  const deletedOld = await prisma.room.deleteMany({
    where: { roomNumber: { notIn: validRoomNumbers } },
  });
  if (deletedOld.count > 0) {
    console.log(`🧹 Removed ${deletedOld.count} old rooms from database.`);
  }

  const allRooms = await prisma.room.findMany({ orderBy: { roomNumber: 'asc' } });
  console.log('✅ Rooms seeded successfully! Active rooms:');
  allRooms.forEach(r => {
    console.log(` - ${r.roomNumber}: Floor ${r.floor}, ${r.roomType} (Capacity: ${r.capacity})`);
  });
}

async function main() {
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} of ${maxRetries}...`);
      await seedRooms();
      break;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      if (attempt === maxRetries) {
        throw error;
      }
      console.log('Waiting 3 seconds before retry...');
      await new Promise(res => setTimeout(res, 3000));
    }
  }
  await prisma.$disconnect();
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error('❌ Error seeding rooms:', e);
      process.exit(1);
    });
}

module.exports = seedRooms;
