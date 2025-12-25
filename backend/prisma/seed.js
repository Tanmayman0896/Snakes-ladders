const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Hash passwords
  const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
  };

  // Create Superadmin
  const superadminPassword = await hashPassword('super123');
  const superadmin = await prisma.user.upsert({
    where: { username: 'SUPER001' },
    update: {},
    create: {
      username: 'SUPER001',
      password: superadminPassword,
      role: 'SUPERADMIN',
    },
  });
  console.log('✅ Superadmin created:', superadmin.username);

  // Create Admin
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { username: 'ADMIN001' },
    update: {},
    create: {
      username: 'ADMIN001',
      password: adminPassword,
      role: 'ADMIN',
    },
  });


  // Create a test team
  const team = await prisma.team.upsert({
    where: { teamCode: 'TEAM001' },
    update: {},
    create: {
      teamCode: 'TEAM001',
      teamName: 'Test Team',
      currentPosition: 1,
      currentRoom: 1,
      status: 'ACTIVE',
      totalTimeSec: 0,
    },
  });
  console.log('✅ Team created:', team.teamName);

  // Create team members
  const member1 = await prisma.teamMember.upsert({
    where: { id: 'member-1' },
    update: {},
    create: {
      id: 'member-1',
      name: 'Member 1',
      teamId: team.id,
    },
  });

  const member2 = await prisma.teamMember.upsert({
    where: { id: 'member-2' },
    update: {},
    create: {
      id: 'member-2',
      name: 'Member 2',
      teamId: team.id,
    },
  });
  console.log('✅ Team members created');

  // Create Participant user linked to team
  const participantPassword = await hashPassword('team123');
  const participant = await prisma.user.upsert({
    where: { username: 'TEAM001' },
    update: {},
    create: {
      username: 'TEAM001',
      password: participantPassword,
      role: 'PARTICIPANT',
      teamId: team.id,
    },
  });
  console.log('✅ Participant created:', participant.username);

  console.log('\n🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
