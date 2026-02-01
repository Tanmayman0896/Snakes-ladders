const path = require('path');
const prisma = require('../src/config/db');
const {hashPassword} = require('../src/utils/password.util');
const fs = require("fs");
const csv = require("csv-parser");

async function importAdmins() {
  try {
    // Read the Excel file
    const filePath = path.join(__dirname, 'Admins.csv');
    const rows = [];

    console.log('📥 Reading CSV...');

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => rows.push(row))
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`Found ${rows.length} admins\n`);

    console.log('🚀 Starting admin import...\n');

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;
    const txs = [];

    for (const row of rows) {
      try {
        // Expected columns: TEAM ID (used as username), Password/PASSWORD
        // Support multiple column name variants for username
        const username = row.id?.toString().trim();
        const password = row.password?.toString();

        if (!username || !password) {
          console.log(`⚠️  Skipping row - missing username or password:`, row);
          skipCount++;
          continue;
        }

        // Check if admin already exists
        const existingUser = await prisma.user.findUnique({
          where: {username: username.toString().trim()},
        });

        if (existingUser) {
          console.log(`⏭️  ${username} already exists, skipping...`);
          skipCount++;
          continue;
        }

        // Hash the password
        const hashedPassword = await hashPassword(password.toString());

        // Create admin user (no team association)
        txs.push({
          username: username.toString().trim(),
          password: hashedPassword,
          role: 'ADMIN',
          teamId: null, // Admins don't have teams
        });

        console.log(`✅ ${username} - Admin created successfully`);
        successCount++;

      } catch (rowError) {
        console.error(`❌ Error processing admin:`, rowError.message);
        errorCount++;
      }
    }

    await prisma.user.createMany({
      data: txs,
      skipDuplicates: true,
    })

    console.log('\n' + '='.repeat(50));
    console.log('Import Summary:');
    console.log(`✅ Success: ${successCount}`);
    console.log(`⏭️  Skipped: ${skipCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Fatal error during import:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importAdmins();
