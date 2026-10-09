const prisma = require('../src/config/db');

const BOARD_MAPS = [
  {
    name: 'Map-1',
    ladders: [
      { start: 3, end: 8 },
      { start: 12, end: 16 },
      { start: 21, end: 27 },
      { start: 34, end: 39 },
      { start: 47, end: 52 },
      { start: 61, end: 66 },
      { start: 73, end: 78 },
      { start: 88, end: 94 },
      { start: 104, end: 110 },
    ],
    snakes: [
      2, 6, 18, 31, 42, 55, 63, 71, 79,
      86, 91, 99, 108, 117, 124, 132, 138,
      142, 146, 149,
    ],
  },
  {
    name: 'Map-2',
    ladders: [
      { start: 4, end: 9 },
      { start: 14, end: 19 },
      { start: 26, end: 31 },
      { start: 38, end: 44 },
      { start: 51, end: 57 },
      { start: 64, end: 70 },
      { start: 76, end: 81 },
      { start: 92, end: 97 },
      { start: 115, end: 121 },
    ],
    snakes: [
      5, 11, 23, 29, 36, 48, 59, 67, 74,
      83, 89, 96, 103, 111, 119, 127, 135,
      141, 145, 149,
    ],
  },
  {
    name: 'Map-3',
    ladders: [
      { start: 2, end: 7 },
      { start: 17, end: 22 },
      { start: 29, end: 34 },
      { start: 41, end: 46 },
      { start: 55, end: 60 },
      { start: 69, end: 74 },
      { start: 82, end: 87 },
      { start: 95, end: 100 },
      { start: 111, end: 117 },
    ],
    snakes: [
      8, 15, 25, 33, 44, 52, 61, 70, 78,
      85, 93, 101, 109, 116, 123, 130, 137,
      143, 147, 149,
    ],
  },
  {
    name: 'Map-4',
    ladders: [
      { start: 5, end: 10 },
      { start: 13, end: 18 },
      { start: 28, end: 33 },
      { start: 40, end: 46 },
      { start: 53, end: 59 },
      { start: 67, end: 72 },
      { start: 81, end: 86 },
      { start: 103, end: 109 },
      { start: 125, end: 131 },
    ],
    snakes: [
      3, 9, 16, 24, 35, 43, 50, 58, 65,
      77, 84, 90, 98, 106, 114, 122, 134,
      140, 144, 149,
    ],
  },
  {
    name: 'Map-5',
    ladders: [
      { start: 6, end: 11 },
      { start: 16, end: 21 },
      { start: 30, end: 36 },
      { start: 43, end: 48 },
      { start: 57, end: 63 },
      { start: 71, end: 76 },
      { start: 84, end: 90 },
      { start: 100, end: 106 },
      { start: 118, end: 124 },
    ],
    snakes: [
      1, 7, 19, 27, 38, 45, 54, 62, 69,
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
