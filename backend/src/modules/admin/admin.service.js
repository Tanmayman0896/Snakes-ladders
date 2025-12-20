const prisma = require('../../prisma/client');

const getAllTeams = async () => {
  return await prisma.team.findMany({
    include: {
      members: true,
      checkpoints: {
        orderBy: { checkpointNumber: 'desc' },
        take: 1,
        include: {
          questionAssign: {
            include: { question: true },
          },
        },
      },
    },
    orderBy: { currentPosition: 'desc' },
  });
};

const getTeamById = async (teamId) => {
  return await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      members: true,
      checkpoints: {
        orderBy: { checkpointNumber: 'asc' },
        include: {
          questionAssign: {
            include: { question: true },
          },
        },
      },
      diceRolls: {
        orderBy: { createdAt: 'desc' },
      },
      timeLogs: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });
};
 //Get all pending checkpoints for admin view

const getPendingCheckpoints = async () => {
  return await prisma.checkpoint.findMany({
    where: { status: 'PENDING' },
    include: {
      team: {
        select: {
          id: true,
          teamCode: true,
          teamName: true,
          currentPosition: true,
          currentRoom: true,
        },
      },
      questionAssign: {
        include: { question: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  });
};


const getCheckpointById = async (checkpointId) => {
  return await prisma.checkpoint.findUnique({
    where: { id: checkpointId },
    include: {
      team: true,
      questionAssign: {
        include: { question: true },
      },
    },
  });
};


const assignQuestionToCheckpoint = async (checkpointId, questionId) => {
  // Check if question is already assigned to another pending checkpoint
  const existingAssignment = await prisma.questionAssignment.findFirst({
    where: {
      questionId,
      status: 'PENDING',
    },
  });

  if (existingAssignment) {
    throw new Error('Question is already assigned to another team');
  }

  return await prisma.questionAssignment.create({
    data: {
      checkpointId,
      questionId,
    },
    include: {
      question: true,
      checkpoint: true,
    },
  });
};


const markQuestionAnswer = async (assignmentId, isCorrect) => {
  const assignment = await prisma.questionAssignment.findUnique({
    where: { id: assignmentId },
    include: {
      checkpoint: {
        include: { team: true },
      },
    },
  });

  if (!assignment) {
    throw new Error('Question assignment not found');
  }

  // Update question status
  const updatedAssignment = await prisma.questionAssignment.update({
    where: { id: assignmentId },
    data: {
      status: isCorrect ? 'CORRECT' : 'INCORRECT',
      answeredAt: new Date(),
    },
  });

  // Approve checkpoint
  await prisma.checkpoint.update({
    where: { id: assignment.checkpointId },
    data: { status: 'APPROVED' },
  });

  // Enable dice roll for team
  await prisma.team.update({
    where: { id: assignment.checkpoint.teamId },
    data: { canRollDice: true },
  });

  return updatedAssignment;
};

const getAvailableQuestions = async (type = null) => {
  const assignedQuestionIds = await prisma.questionAssignment.findMany({
    where: { status: 'PENDING' },
    select: { questionId: true },
  });

  const excludeIds = assignedQuestionIds.map(a => a.questionId);

  const whereClause = {
    isActive: true,
    id: { notIn: excludeIds },
  };

  if (type) {
    whereClause.type = type;
  }

  return await prisma.question.findMany({
    where: whereClause,
    orderBy: { createdAt: 'asc' },
  });
};

const getTeamProgress = async (teamId) => {
  return await prisma.checkpoint.findMany({
    where: { teamId },
    include: {
      questionAssign: {
        include: { question: true },
      },
    },
    orderBy: { checkpointNumber: 'asc' },
  });
};

module.exports = {
  getAllTeams,
  getTeamById,
  getPendingCheckpoints,
  getCheckpointById,
  assignQuestionToCheckpoint,
  markQuestionAnswer,
  getAvailableQuestions,
  getTeamProgress,
};
