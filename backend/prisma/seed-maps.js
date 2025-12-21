const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 5 Different Board Maps with unique snake positions
// Each map has 8 snakes - NO snake head positions are shared between maps
const BOARD_MAPS = [
  {
    name: 'Map-1',
    snakes: [
      { start: 16, end: 6 },
      { start: 47, end: 26 },
      { start: 49, end: 11 },
      { start: 56, end: 53 },
      { start: 62, end: 19 },
      { start: 64, end: 60 },
      { start: 87, end: 24 },
      { start: 93, end: 73 },
    ],
  },
  {
    name: 'Map-2',
    snakes: [
      { start: 14, end: 4 },
      { start: 31, end: 9 },
      { start: 48, end: 28 },
      { start: 55, end: 33 },
      { start: 67, end: 45 },
      { start: 72, end: 51 },
      { start: 88, end: 36 },
      { start: 95, end: 75 },
    ],
  },
  {
    name: 'Map-3',
    snakes: [
      { start: 17, end: 7 },
      { start: 34, end: 12 },
      { start: 44, end: 22 },
      { start: 58, end: 38 },
      { start: 69, end: 47 },
      { start: 78, end: 58 },
      { start: 84, end: 64 },
      { start: 97, end: 77 },
    ],
  },
  {
    name: 'Map-4',
    snakes: [
      { start: 19, end: 9 },
      { start: 37, end: 15 },
      { start: 46, end: 24 },
      { start: 52, end: 30 },
      { start: 65, end: 43 },
      { start: 75, end: 54 },
      { start: 89, end: 68 },
      { start: 91, end: 71 },
    ],
  },
  {
    name: 'Map-5',
    snakes: [
      { start: 21, end: 11 },
      { start: 39, end: 17 },
      { start: 43, end: 21 },
      { start: 59, end: 37 },
      { start: 66, end: 44 },
      { start: 79, end: 57 },
      { start: 86, end: 66 },
      { start: 98, end: 78 },
    ],
  },
];

async function seedBoardMaps() {
  console.log('🎲 Starting board maps seed...\n');

  // Clear existing board rules and maps
  await prisma.boardRule.deleteMany({});
  await prisma.boardMap.deleteMany({});
  console.log('✓ Cleared existing board maps and rules\n');

  // Create each board map with its snakes
  for (const mapData of BOARD_MAPS) {
    const map = await prisma.boardMap.create({
      data: {
        name: mapData.name,
        isActive: true,
      },
    });

    console.log(`📍 Created ${mapData.name} (ID: ${map.id})`);

    // Create snakes for this map
    for (const snake of mapData.snakes) {
      await prisma.boardRule.create({
        data: {
          mapId: map.id,
          type: 'SNAKE',
          startPos: snake.start,
          endPos: snake.end,
        },
      });
    }

    console.log(`   └── Added ${mapData.snakes.length} snakes: ${mapData.snakes.map(s => s.start).join(', ')}`);
  }

  console.log('\n✅ Board maps seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   • Total Maps: ${BOARD_MAPS.length}`);
  console.log(`   • Snakes per Map: 8`);
  console.log(`   • All snake head positions are unique across maps`);
}

async function main() {
  try {
    await seedBoardMaps();
  } catch (error) {
    console.error('❌ Error seeding board maps:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();

