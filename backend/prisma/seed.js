const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const prisma = require('../src/config/db');
const seedRooms = require('./seed-rooms');
const seedBoardMaps = require('./seed-maps');
const seedQuestions = require('./seed-questions');

// 1. Superadmin Usernames (Passwords are strictly stored as hashes in DB only)
const SUPERADMIN_USERNAMES = [
  'Tanmoy mandal',
  'Vidhyanshu',
  'Moneylender',
];

// 2. Admin Usernames (Passwords are strictly stored as hashes in DB only)
const ADMIN_USERNAMES = [
  'Shreyansh',
  'Anshuman',
  'Daksh',
  'Shreet',
  'Shresht',
  'Krishna',
  'Harshvardhan',
  'Ankush',
  'Mishika',
  'Pari',
  'Akshay Pathak',
  'Nandini',
  'Shreya',
  'Yuvika',
  'Eva',
  'Pranjal',
  'Naisha',
  'Sanvi Mittal',
  'Sarthak',
  'Devishi',
  'Namit',
  'Abir',
  'Ananya Mishra',
  'Aditi Rai',
  'ADMIN001',
  'ADMIN002',
  'ADMIN003',
  'ADMIN004',
  'ADMIN005',
  'ADMIN006',
  'ADMIN007',
  'ADMIN008',
  'ADMIN009',
  'ADMIN010',
  'ADMIN011',
  'ADMIN012',
  'ADMIN013',
  'ADMIN014',
  'ADMIN015',
];

// 3. Teams Definition (40 Teams)
const TEAMS_CONFIG = [
  { code: 'TEAM001', name: 'BUGS 2.0' },
  { code: 'TEAM002', name: 'monolith' },
  { code: 'TEAM003', name: 'Smasher' },
  { code: 'TEAM004', name: 'Power Rangers' },
  { code: 'TEAM005', name: 'six seven' },
  { code: 'TEAM006', name: 'full power' },
  { code: 'TEAM007', name: 'Hurray' },
  { code: 'TEAM008', name: 'Refractor' },
  { code: 'TEAM009', name: '708' },
  { code: 'TEAM010', name: 'Cocomelon' },
  { code: 'TEAM011', name: 'Snickers' },
  { code: 'TEAM012', name: 'AJ' },
  { code: 'TEAM013', name: 'Aadhya Chaudhary' },
  { code: 'TEAM014', name: 'Nvidea' },
  { code: 'TEAM015', name: 'Phoneix' },
  { code: 'TEAM016', name: 'gabrufrombagru' },
  { code: 'TEAM017', name: 'Absolutely Sober' },
  { code: 'TEAM018', name: '404-Antivenom Not Found' },
  { code: 'TEAM019', name: 'Fatal bite' },
  { code: 'TEAM020', name: 'Azzy' },
  { code: 'TEAM021', name: 'team blue' },
  { code: 'TEAM022', name: 'Roomies' },
  { code: 'TEAM023', name: 'The Lunatics' },
  { code: 'TEAM024', name: 'Game changers' },
  { code: 'TEAM025', name: 'RANGDAARS' },
  { code: 'TEAM026', name: 'Sapole' },
  { code: 'TEAM027', name: 'Thassa' },
  { code: 'TEAM028', name: 'Team Cobra' },
  { code: 'TEAM029', name: 'Aditya swaroop' },
  { code: 'TEAM030', name: 'Piyush Raj' },
  { code: 'TEAM031', name: 'CTRL+SLAY' },
  { code: 'TEAM032', name: 'orange' },
  { code: 'TEAM033', name: 'Joshilaaaa' },
  { code: 'TEAM034', name: 'Bro code' },
  { code: 'TEAM035', name: 'NOOBS' },
  { code: 'TEAM036', name: 'Ex Heads' },
  { code: 'TEAM037', name: 'Joker' },
  { code: 'TEAM038', name: 'Individual' },
  { code: 'TEAM039', name: 'Individual' },
  { code: 'TEAM040', name: 'Elites' },
];

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

  // Helper for password hashing if a fresh account needs creation
  const hashPassword = async (pwd) => bcrypt.hash(pwd, 10);

  // 4. Ensure Super Admins exist in DB (Preserves existing passwords in DB)
  console.log(`\n--- 4. Checking ${SUPERADMIN_USERNAMES.length} Super Admins ---`);
  for (const username of SUPERADMIN_USERNAMES) {
    const existing = await prisma.user.findFirst({ where: { username } });

    if (existing) {
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: 'SUPERADMIN' },
      });
      console.log(`✅ Superadmin verified in DB: ${username}`);
      continue;
    }

    // Only if account does not exist in DB (generate secure fallback)
    const initialPassword = process.env.INITIAL_SUPERADMIN_PASSWORD || crypto.randomBytes(8).toString('hex');
    const passwordHash = await hashPassword(initialPassword);

    await prisma.user.create({
      data: {
        username,
        password: passwordHash,
        role: 'SUPERADMIN',
      },
    });
    console.log(`✅ Superadmin created in DB: ${username}`);
  }

  // 5. Ensure Admins exist in DB (Preserves existing passwords in DB)
  console.log(`\n--- 5. Checking ${ADMIN_USERNAMES.length} Admins ---`);
  for (const username of ADMIN_USERNAMES) {
    const existing = await prisma.user.findFirst({ where: { username } });

    if (existing) {
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: 'ADMIN' },
      });
      console.log(`✅ Admin verified in DB: ${username}`);
      continue;
    }

    const initialPassword = process.env.INITIAL_ADMIN_PASSWORD || crypto.randomBytes(8).toString('hex');
    const passwordHash = await hashPassword(initialPassword);

    await prisma.user.create({
      data: {
        username,
        password: passwordHash,
        role: 'ADMIN',
      },
    });
    console.log(`✅ Admin created in DB: ${username}`);
  }

  // 6. Ensure 40 Teams exist in DB (Preserves existing passwords in DB)
  console.log(`\n--- 6. Checking ${TEAMS_CONFIG.length} Participant Teams ---`);
  const allMaps = await prisma.boardMap.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } });
  const defaultMapId = allMaps.length > 0 ? allMaps[0].id : null;

  for (let i = 0; i < TEAMS_CONFIG.length; i++) {
    const { code: teamCode, name: teamName } = TEAMS_CONFIG[i];
    const assignedRoom = 'AB1 307';
    const assignedMap = allMaps.length > 0 ? allMaps[i % allMaps.length].id : defaultMapId;

    // Create or update Team metadata
    const team = await prisma.team.upsert({
      where: { teamCode },
      update: {
        teamName,
        mapId: assignedMap,
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

    // Create Participant user ONLY if not already existing (never overwrite existing passwords)
    const existingUser = await prisma.user.findFirst({ where: { username: teamCode } });
    if (!existingUser) {
      const initialPassword = process.env.INITIAL_TEAM_PASSWORD || crypto.randomBytes(8).toString('hex');
      const passwordHash = await hashPassword(initialPassword);
      await prisma.user.create({
        data: {
          username: teamCode,
          password: passwordHash,
          role: 'PARTICIPANT',
          teamId: team.id,
        },
      });
    }

    if ((i + 1) % 20 === 0 || i === TEAMS_CONFIG.length - 1) {
      console.log(`✅ Verified ${i + 1}/${TEAMS_CONFIG.length} teams`);
    }
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
