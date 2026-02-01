const {PrismaClient} = require('./generated/prisma');
const bcrypt = require("bcryptjs");
const {Pool} = require("pg");
const {PrismaPg} = require("@prisma/adapter-pg"); // adjust path
require('dotenv').config();

const pool = new Pool({connectionString: process.env.DATABASE_URL});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

async function main() {
  try {
    // 2. Hash password
    const plainPassword = process.env.PASSWORD;
    const adminPassword = await hashPassword(plainPassword);

    const adminCount = await prisma.user.findMany({
      where: {
        role: "SUPERADMIN"
      }
    });
    const username = `SUPER${(adminCount.length + 1).toString().padStart(3, '0')}`;

    // 3. Create admin user
    const admin = await prisma.user.create({
      data: {
        username,
        password: adminPassword,
        role: 'SUPERADMIN',
      },
    });

    // 4. Return / print plain password
    console.log('\n✅ Super Admin user ready');
    console.log('Username:', username);
    console.log('Plain password:', plainPassword);
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
