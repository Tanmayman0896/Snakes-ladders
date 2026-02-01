const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const prisma = require('../src/config/db');

async function main() {
  const fileName = process.argv[2] || 'QUESTIONS.xlsx';
  const filePath = path.resolve(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    console.error('Excel file not found:', filePath);
    process.exit(1);
  }


  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet, {defval: ''});

  if (rows.length > 0) {
    console.log('Detected columns in first row:', Object.keys(rows[0]));
  } else {
    console.log('No rows found in the Excel file.');
    process.exit(1);
  }

  let imported = 0, skipped = 0;
  const txs = [];
  for (const row of rows) {
    // Trim all keys for robust matching
    // console.log(row)

    const qNo = row['Question number'];
    const type = (row['Question type'] || '').toUpperCase().trim();
    const text = row['Question'];
    const answer = row['Answer'];
    const hint = String(row['Question hint']);
    // Option columns
    const optionA = row['Option A'];
    const optionB = row['Option B'];
    const optionC = row['Option C'];
    const optionD = row['Option D'];
    const category = row['Category'];

    if (!text || !type) {
      skipped++;
      console.log('Skipped row:', {text, type, row});
      continue;
    }

    // Prepare MCQ options as array if present
    let optionsArr = [];
    if (type === 'MCQ') {
      optionsArr = [optionA, optionB, optionC, optionD].map(String).filter(Boolean);
    }

    txs.push({
      type,
      text,
      hint,
      isSnakeQuestion: category === 'Snake',
      options: optionsArr.length ? optionsArr : undefined,
      correctAnswer: answer ? String(answer) : undefined,
    });
    imported++;
  }

  await prisma.question.createMany({
    data: txs,
    skipDuplicates: true,
  })
  console.log(`Imported: ${imported}, Skipped: ${skipped}`);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
