const prisma = require('../../config/db');
const { getBoardStateForTeam } = require('../game/board.service');


const getDashboard = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      members: true,
      checkpoints: {
        include: {
          questionAssign: {
            include: {
              question: {
                select: {
                  id: true,
                  text: true,
                  type: true,
                },
              },
            },
          },
        },
        orderBy: { checkpointNumber: 'desc' },
        take: 5,
      },
    },
  });

  if (!team) {
    throw new Error('Team not found');
  }

  const boardState = await getBoardStateForTeam(teamId);

  return {
    team: {
      id: team.id,
      teamCode: team.teamCode,
      teamName: team.teamName,
      currentPosition: team.currentPosition,
      currentRoom: team.currentRoom,
      totalTimeSec: team.totalTimeSec,
      status: team.status,
      canRollDice: team.canRollDice,
      members: team.members,
    },
    recentCheckpoints: team.checkpoints,
    boardState,
  };
};


const getTeamState = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: {
      id: true,
      teamCode: true,
      teamName: true,
      currentPosition: true,
      currentRoom: true,
      totalTimeSec: true,
      status: true,
      canRollDice: true,
      timerPaused: true,
      timerStartedAt: true,
      timerPausedAt: true,
    },
  });

  if (!team) {
    return null;
  }

  // Calculate current time based on server time
  let currentTimeSec = team.totalTimeSec;

  // If timer is running (not paused and not completed) and has started
  if (!team.timerPaused && team.status !== 'COMPLETED' && team.timerStartedAt) {
    const now = new Date();
    const startTime = team.timerStartedAt;
    const elapsedSinceStart = Math.floor((now - startTime) / 1000);
    currentTimeSec = team.totalTimeSec + elapsedSinceStart;
  }

  return {
    ...team,
    totalTimeSec: currentTimeSec
  };
};

const getCheckpoints = async (teamId) => {
  return await prisma.checkpoint.findMany({
    where: { teamId },
    include: {
      questionAssign: {
        include: {
          question: {
            select: {
              id: true,
              text: true,
              type: true,
            },
          },
        },
      },
    },
    orderBy: { checkpointNumber: 'asc' },
  });
};


const getBoard = async (teamId) => {
  return await getBoardStateForTeam(teamId);
};

// Get current checkpoint (pending approval OR approved but waiting for question/answer)
const getPendingCheckpoint = async (teamId) => {
  // First check if there's an unanswered question assignment
  const checkpointWithQuestion = await prisma.checkpoint.findFirst({
    where: {
      teamId,
      questionAssign: {
        status: 'PENDING', // Question assigned but not answered
      },
    },
    select: {
      id: true,
      checkpointNumber: true,
      positionBefore: true,
      positionAfter: true,
      roomNumber: true,
      status: true,
      isSnakePosition: true,
      isLadderPosition: true,
      ladderEndPos: true,
      createdAt: true,
      questionAssign: {
        select: {
          id: true,
          status: true,
          participantAnswer: true,
          question: {
            select: {
              id: true,
              text: true,
              type: true,
              options: true,
              isSnakeQuestion: true,
              isLadderQuestion: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (checkpointWithQuestion) {
    // Map question text to content for frontend
    if (checkpointWithQuestion.questionAssign?.question) {
      checkpointWithQuestion.questionAssign.question.content = checkpointWithQuestion.questionAssign.question.text;
    }
    return checkpointWithQuestion;
  }

  // Then check for approved checkpoint without question (waiting for admin to assign)
  const approvedWithoutQuestion = await prisma.checkpoint.findFirst({
    where: {
      teamId,
      status: 'APPROVED',
      questionAssign: null,
    },
    select: {
      id: true,
      checkpointNumber: true,
      positionBefore: true,
      positionAfter: true,
      roomNumber: true,
      status: true,
      isSnakePosition: true,
      isLadderPosition: true,
      ladderEndPos: true,
      createdAt: true,
      questionAssign: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  if (approvedWithoutQuestion) {
    return approvedWithoutQuestion;
  }

  // Finally check for pending checkpoint (waiting for admin approval)
  return await prisma.checkpoint.findFirst({
    where: {
      teamId,
      status: 'PENDING',
    },
    select: {
      id: true,
      checkpointNumber: true,
      positionBefore: true,
      positionAfter: true,
      roomNumber: true,
      status: true,
      isSnakePosition: true,
      createdAt: true,
      questionAssign: {
        select: {
          id: true,
          status: true,
        },
      },
    },
    orderBy: {createdAt: 'desc'},
  });
};

 //Check if team can roll dice

const canRollDice = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: {
      canRollDice: true,
      status: true,
    },
  });

  if (!team) {
    return { canRoll: false, reason: 'Team not found' };
  }

  if (team.status === 'COMPLETED') {
    return { canRoll: false, reason: 'Team has completed the game' };
  }

  if (team.status === 'DISQUALIFIED') {
    return { canRoll: false, reason: 'Team is disqualified' };
  }

  if (!team.canRollDice) {
    return { canRoll: false, reason: 'Pending checkpoint approval' };
  }

  return { canRoll: true, reason: null };
};

// Submit answer for a question assignment
const submitAnswer = async (teamId, assignmentId, answer) => {
  // Get the question assignment with question details
  const assignment = await prisma.questionAssignment.findUnique({
    where: { id: assignmentId },
    include: {
      question: true,
      checkpoint: {
        select: {
          id: true,
          teamId: true,
          isSnakePosition: true,
        },
      },
    },
  });

  if (!assignment) {
    throw new Error('Question assignment not found');
  }

  // Verify the assignment belongs to this team
  if (assignment.checkpoint.teamId !== teamId) {
    throw new Error('This question assignment does not belong to your team');
  }

  // Check if answer already submitted
  if (assignment.participantAnswer) {
    throw new Error('Answer already submitted. You cannot re-submit.');
  }

  const question = assignment.question;
  let isAutoMarked = false;
  let isCorrect = false;
  let newStatus = 'PENDING'; // Default - waiting for admin to mark

  // Auto-check for NUMERICAL and MCQ types
  if (question.type === 'NUMERICAL' || question.type === 'MCQ') {
    isAutoMarked = true;

    // Normalize answers for comparison
    const submittedAnswer = answer.trim().toLowerCase();
    const correctAnswer = question.correctAnswer?.trim().toLowerCase();

    isCorrect = submittedAnswer === correctAnswer;

    // Additional matching logic:
    if (!isCorrect) {
      // 1. Option letter vs Option text matching (if options array exists)
      if (question.options && question.options.length > 0) {
        const letters = ['a', 'b', 'c', 'd', 'e'];
        const correctIndex = question.options.findIndex(
          opt => opt.trim().toLowerCase() === correctAnswer
        );

        const submittedIdx = letters.indexOf(submittedAnswer);
        if (submittedIdx !== -1 && submittedIdx === correctIndex) {
          isCorrect = true;
        } else if (correctAnswer && letters.includes(correctAnswer)) {
          const targetIdx = letters.indexOf(correctAnswer);
          if (question.options[targetIdx]?.trim().toLowerCase() === submittedAnswer) {
            isCorrect = true;
          }
        }
      }

      // 2. Clean alphanumeric matching (removes ₹, commas, %, 'bytes', spaces)
      if (!isCorrect && correctAnswer) {
        const cleanSubmitted = submittedAnswer.replace(/[^0-9a-z.-]/gi, '');
        const cleanCorrect = correctAnswer.replace(/[^0-9a-z.-]/gi, '');
        if (cleanSubmitted && cleanCorrect && cleanSubmitted === cleanCorrect) {
          isCorrect = true;
        }
      }

      // 3. Flexible dual-valid checks for tricky aptitude questions
      if (!isCorrect) {
        // H6: 40 km/h or 45 km/h
        if (question.text.includes('1/3 of a journey at 30 km/h') && (submittedAnswer.includes('40') || submittedAnswer.includes('45') || submittedAnswer === 'a' || submittedAnswer === 'b')) {
          isCorrect = true;
        }
        // H7: 20 or 21
        if (question.text.includes('average height of 160 cm') && (submittedAnswer === '20' || submittedAnswer === '21' || submittedAnswer === 'b' || submittedAnswer === 'c')) {
          isCorrect = true;
        }
        // H8: 47 or 74
        if (question.text.includes('digits whose sum is 11') && (submittedAnswer === '47' || submittedAnswer === '74' || submittedAnswer === 'a' || submittedAnswer === 'd')) {
          isCorrect = true;
        }
        // H9: 4 or 8
        if (question.text.includes('father is 4 times as old') && (submittedAnswer === '4' || submittedAnswer === '8' || submittedAnswer === 'a' || submittedAnswer === 'c')) {
          isCorrect = true;
        }
        // Binary rotation: 01011010 or 1011010
        if (question.text.includes('circular left rotation on 10010110') && (submittedAnswer === '01011010' || submittedAnswer === '1011010')) {
          isCorrect = true;
        }
        // Binary addition: 11000 or 24
        if (question.text.includes('(1011)₂+(1101)₂') && (submittedAnswer === '11000' || submittedAnswer === '24' || submittedAnswer.includes('11000'))) {
          isCorrect = true;
        }
        // Shift left: 180 or 10110100
        if (question.text.includes('Shift (101101)₂ left by 2') && (submittedAnswer.includes('180') || submittedAnswer.includes('10110100'))) {
          isCorrect = true;
        }
      }
    }

    newStatus = isCorrect ? 'CORRECT' : 'INCORRECT';
  }

  // Calculate points based on snake position and answer correctness
  let pointsChange = 0;
  if (isAutoMarked) {
    if (assignment.checkpoint.isSnakePosition) {
      // Snake position: correct = 0, incorrect = -1
      pointsChange = isCorrect ? 0 : -1;
    } else {
      // Normal position: correct = +1, incorrect = 0
      pointsChange = isCorrect ? 1 : 0;
    }
  }

  // Batch all updates in a transaction for speed
  const [updatedAssignment] = await prisma.$transaction([
    // Update the question assignment with the answer
    prisma.questionAssignment.update({
      where: { id: assignmentId },
      data: {
        participantAnswer: answer,
        submittedAt: new Date(),
        status: newStatus,
      },
      include: {
        question: true,
        checkpoint: true,
      },
    }),

    // Update team points and unlock dice if auto-marked (manual questions wait for admin marking)
    ...(isAutoMarked ? [
      prisma.team.update({
        where: { id: teamId },
        data: {
          points: { increment: pointsChange },
          canRollDice: true, // Unlock dice for auto-marked
        },
      })
    ] : []),

    // Approve the checkpoint
    prisma.checkpoint.update({
      where: { id: assignment.checkpoint.id },
      data: { status: 'APPROVED' },
    }),
  ]);

  return {
    assignment: updatedAssignment,
    autoMarked: isAutoMarked,
    isCorrect: isAutoMarked ? isCorrect : null,
    message: 'Answer submitted successfully.',
  };
};

// Use hint - adds 60 second penalty
const useHint = async (teamId, assignmentId) => {
  // Get the question assignment to verify it belongs to this team
  const assignment = await prisma.questionAssignment.findUnique({
    where: { id: assignmentId },
    select: {
      id: true,
      checkpoint: {
        select: {
          teamId: true,
        },
      },
      question: {
        select: {
          hint: true,
        },
      },
    },
  });

  if (!assignment) {
    throw new Error('Question assignment not found');
  }

  // Verify the assignment belongs to this team
  if (assignment.checkpoint.teamId !== teamId) {
    throw new Error('This question assignment does not belong to your team');
  }

  // Add 60 seconds penalty to team's total time
  const team = await prisma.team.update({
    where: { id: teamId },
    data: {
      totalTimeSec: {
        increment: 60,
      },
    },
    select: {
      totalTimeSec: true,
    },
  });

  return {
    hint: assignment.question.hint,
    penalty: 60,
    newTotalTime: team.totalTimeSec,
    message: '+60 seconds penalty added',
  };
};

// Start timer (called on first dice roll or login)
const startTimer = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: { timerStartedAt: true, timerPaused: true, status: true },
  });

  if (!team || team.status === 'COMPLETED') {
    return;
  }

  // Only start if not already started
  if (!team.timerStartedAt) {
    await prisma.team.update({
      where: { id: teamId },
      data: {
        timerStartedAt: new Date(),
        timerPaused: false,
      },
    });
  }
};

// Pause timer
const pauseTimer = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: {
      totalTimeSec: true,
      timerStartedAt: true,
      timerPaused: true,
      status: true,
    },
  });

  if (!team || team.timerPaused || team.status === 'COMPLETED') {
    return { totalTimeSec: team?.totalTimeSec || 0, timerPaused: true };
  }

  const now = new Date();
  let finalTime = team.totalTimeSec;

  // Calculate and save accumulated time
  if (team.timerStartedAt) {
    const elapsed = Math.floor((now - team.timerStartedAt) / 1000);
    finalTime = team.totalTimeSec + elapsed;
  }

  await prisma.team.update({
    where: { id: teamId },
    data: {
      totalTimeSec: finalTime,
      timerPaused: true,
      timerPausedAt: now,
      timerStartedAt: null,
    },
  });

  return { totalTimeSec: finalTime, timerPaused: true };
};

// Resume timer
const resumeTimer = async (teamId) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: { timerPaused: true, status: true },
  });

  if (!team || !team.timerPaused || team.status === 'COMPLETED') {
    return;
  }

  await prisma.team.update({
    where: { id: teamId },
    data: {
      timerPaused: false,
      timerStartedAt: new Date(),
      timerPausedAt: null,
    },
  });

  return { timerPaused: false };
};

module.exports = {
  getDashboard,
  getTeamState,
  getCheckpoints,
  getPendingCheckpoint,
  getBoard,
  canRollDice,
  submitAnswer,
  useHint,
  startTimer,
  pauseTimer,
  resumeTimer,
};
