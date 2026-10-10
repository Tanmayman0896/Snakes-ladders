const prisma = require('../../config/db');

/**
 * Get available questions for a team based on position type
 * Excludes questions already assigned to this team
 */
const getAvailableQuestions = async (teamId, isSnakePosition, isLadderPosition = false) => {
  // Get all questions already assigned to this team
  const assignedQuestions = await prisma.questionAssignment.findMany({
    where: { 
      checkpoint: { teamId }
    },
    select: { questionId: true },
  });

  const assignedQuestionIds = assignedQuestions.map(q => q.questionId);

  // Build query filters
  const whereClause = {
    id: { notIn: assignedQuestionIds }, // Exclude already assigned questions
  };

  if (isSnakePosition || isLadderPosition) {
    // Snakes and Ladders: strictly CODING / Output-based questions
    whereClause.type = 'CODING';
  } else {
    // Blank block (Normal): strictly NUMERICAL, PHYSICAL, or MCQ questions
    whereClause.type = { in: ['NUMERICAL', 'PHYSICAL', 'MCQ'] };
    whereClause.isSnakeQuestion = false;
    whereClause.isLadderQuestion = false;
  }

  // Get available questions
  const availableQuestions = await prisma.question.findMany({
    where: whereClause,
  });

  return availableQuestions;
};

/**
 * Select a random question for a team
 * Returns question and determines room type needed
 */
const selectRandomQuestion = async (teamId, isSnakePosition, isLadderPosition = false) => {
  let availableQuestions = await getAvailableQuestions(teamId, isSnakePosition, isLadderPosition);

  // If no questions available (all used by this team), allow reuse from full active pool
  if (availableQuestions.length === 0) {
    const whereClause = { isActive: true };

    if (isSnakePosition || isLadderPosition) {
      whereClause.type = 'CODING';
    } else {
      whereClause.type = { in: ['NUMERICAL', 'PHYSICAL', 'MCQ'] };
      whereClause.isSnakeQuestion = false;
      whereClause.isLadderQuestion = false;
    }

    availableQuestions = await prisma.question.findMany({
      where: whereClause,
    });

    if (availableQuestions.length === 0) {
      throw new Error(`No available ${isSnakePosition || isLadderPosition ? 'coding' : 'blank block'} questions exist in database.`);
    }
  }

  let selectedQuestion;

  if (isSnakePosition || isLadderPosition) {
    // Snake or Ladder: Pick random from CODING questions
    selectedQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  } else {
    // Blank block: Balanced random distribution among NUMERICAL, PHYSICAL, and MCQ
    const numericalQuestions = availableQuestions.filter(q => q.type === 'NUMERICAL');
    const physicalQuestions = availableQuestions.filter(q => q.type === 'PHYSICAL');
    const mcqQuestions = availableQuestions.filter(q => q.type === 'MCQ');

    const availableCategories = [];
    if (numericalQuestions.length > 0) availableCategories.push(numericalQuestions);
    if (physicalQuestions.length > 0) availableCategories.push(physicalQuestions);
    if (mcqQuestions.length > 0) availableCategories.push(mcqQuestions);

    if (availableCategories.length > 0) {
      // Pick one category at random, then pick a random question from that category
      const chosenCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
      selectedQuestion = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    } else {
      selectedQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    }
  }

  // Determine room type based on question type
  // CODING questions require TECH rooms; NUMERICAL, PHYSICAL, and MCQ use NON_TECH rooms
  const roomType = selectedQuestion.type === 'CODING' ? 'TECH' : 'NON_TECH';

  return {
    question: selectedQuestion,
    roomType,
  };
};

module.exports = {
  getAvailableQuestions,
  selectRandomQuestion,
};

