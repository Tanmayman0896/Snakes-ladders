const prisma = require('../src/config/db');

const BOARD_MAPS = [
  {
    name: 'Map-1',
    ladders: [
      { start: 8, end: 13 },
      { start: 19, end: 24 },
      { start: 28, end: 34 },
      { start: 36, end: 41 },
      { start: 49, end: 54 },
      { start: 68, end: 74 },
      { start: 88, end: 93 },
      { start: 98, end: 104 },
      { start: 128, end: 133 },
    ],
    snakes: [
      2, 6, 18, 25, 31, 42, 55, 63, 71, 79,
      86, 91, 99, 108, 117, 124, 132, 138,
      142, 146, 149,
    ],
  },
  {
    name: 'Map-2',
    ladders: [
      { start: 8, end: 14 },
      { start: 18, end: 24 },
      { start: 37, end: 42 },
      { start: 47, end: 53 },
      { start: 58, end: 64 },
      { start: 78, end: 84 },
      { start: 97, end: 102 },
      { start: 108, end: 114 },
      { start: 128, end: 134 },
    ],
    snakes: [
      5, 11, 23, 29, 31, 36, 48, 59, 67, 74,
      83, 89, 96, 103, 111, 119, 127, 135,
      141, 145, 149,
    ],
  },
  {
    name: 'Map-3',
    ladders: [
      { start: 7, end: 12 },
      { start: 18, end: 24 },
      { start: 27, end: 32 },
      { start: 36, end: 42 },
      { start: 47, end: 53 },
      { start: 58, end: 64 },
      { start: 76, end: 82 },
      { start: 96, end: 102 },
      { start: 126, end: 132 },
    ],
    snakes: [
      8, 15, 25, 33, 40, 44, 52, 61, 70, 78,
      85, 93, 101, 109, 116, 123, 130, 137,
      143, 147, 149,
    ],
  },
  {
    name: 'Map-4',
    ladders: [
      { start: 7, end: 13 },
      { start: 17, end: 22 },
      { start: 27, end: 32 },
      { start: 37, end: 42 },
      { start: 46, end: 52 },
      { start: 67, end: 73 },
      { start: 76, end: 82 },
      { start: 97, end: 103 },
      { start: 117, end: 123 },
    ],
    snakes: [
      3, 9, 16, 20, 24, 35, 43, 50, 58, 65,
      77, 84, 90, 98, 106, 114, 122, 134,
      140, 144, 149,
    ],
  },
  {
    name: 'Map-5',
    ladders: [
      { start: 8, end: 13 },
      { start: 16, end: 22 },
      { start: 24, end: 31 },
      { start: 37, end: 43 },
      { start: 47, end: 53 },
      { start: 57, end: 63 },
      { start: 68, end: 74 },
      { start: 86, end: 92 },
      { start: 117, end: 123 },
    ],
    snakes: [
      1, 7, 19, 27, 30, 38, 45, 54, 62, 69,
      80, 87, 94, 102, 110, 120, 128, 136,
      142, 146, 149,
    ],
  },
];

async function seedBoardMaps() {
  console.log('🌱 Starting board maps seed (5 Maps)...\n');

  const activeMapNames = BOARD_MAPS.map(m => m.name);

  // 1. Create or update the 5 active maps
  const createdMaps = [];
  for (const mapData of BOARD_MAPS) {
    const map = await prisma.boardMap.upsert({
      where: { name: mapData.name },
      update: { isActive: true },
      create: {
        name: mapData.name,
        isActive: true,
      },
    });

    createdMaps.push(map);

    // Delete existing rules for this map to replace cleanly
    await prisma.boardRule.deleteMany({ where: { mapId: map.id } });

    // Build rules: snakes (no endPos) + ladders (with endPos)
    const rules = [
      ...mapData.snakes.map(pos => ({
        mapId: map.id,
        type: 'SNAKE',
        startPos: pos,
        endPos: null,
      })),
      ...mapData.ladders.map(l => ({
        mapId: map.id,
        type: 'LADDER',
        startPos: l.start,
        endPos: l.end,
      })),
    ];

    await prisma.boardRule.createMany({
      data: rules,
    });

    console.log(`Configured ${mapData.name} (ID: ${map.id})`);
    console.log(`   Snakes: ${mapData.snakes.length} positions`);
    console.log(`   Ladders: ${mapData.ladders.length} (${mapData.ladders.map(l => `${l.start}->${l.end}`).join(', ')})`);
  }

  // 2. Reassign any teams that were assigned to maps outside Map-1..Map-5
  const extraMaps = await prisma.boardMap.findMany({
    where: { name: { notIn: activeMapNames } },
  });

  if (extraMaps.length > 0) {
    const extraMapIds = extraMaps.map(m => m.id);
    const teamsOnExtraMaps = await prisma.team.findMany({
      where: { mapId: { in: extraMapIds } },
    });

    for (let i = 0; i < teamsOnExtraMaps.length; i++) {
      const targetMap = createdMaps[i % createdMaps.length];
      await prisma.team.update({
        where: { id: teamsOnExtraMaps[i].id },
        data: { mapId: targetMap.id },
      });
    }

    // Delete extra board rules and maps
    await prisma.boardRule.deleteMany({ where: { mapId: { in: extraMapIds } } });
    await prisma.boardMap.deleteMany({ where: { id: { in: extraMapIds } } });
    console.log(`🧹 Cleaned up ${extraMaps.length} old maps (${extraMaps.map(m => m.name).join(', ')})`);
  }

  console.log('\nBoard maps seeded successfully! Exactly 5 maps configured.');
}

async function main() {
  try {
    await seedBoardMaps();
  } catch (error) {
    console.error('Error seeding board maps:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}

module.exports = seedBoardMaps;
