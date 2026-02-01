"use client"

import {useEffect, useRef, useState} from "react"
import Image from "next/image"
import {useRouter} from "next/navigation"

import {Header} from "@/components/participant/header"
import {StatusStrip} from "@/components/participant/status-strip"
import {Dice} from "@/components/participant/dice"
import {Board} from "@/components/participant/board"
import {TeamsList} from "@/components/participant/teams-list"
import {QuestionPanel} from "@/components/participant/question-panel"
import {Toaster} from "@/components/ui/toaster"
import {useToast} from "@/hooks/use-toast"
import {apiService} from "@/lib/service";
import {useCheckVersion} from "@/hooks/use-check-version";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {mayak, venom} from "@/app/fonts";
import {motion} from "framer-motion";

/* ---------- TYPES ---------- */

interface TeamData {
  teamId: string
  currentPosition: number
  currentRoom: string
  canRollDice: boolean
  totalTimeSec: number
  status?: string
  timerPaused?: boolean
}

interface LeaderboardTeam {
  id: string
  position: number
}

export type GameStatus =
  | "IDLE"
  | "ROLLING"
  | "PENDING_APPROVAL"
  | "QUESTION_ASSIGNED"
  | "SOLVING"
  | "LOCKED"

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

/* ---------- COMPONENT ---------- */

export default function ParticipantDashboard() {
  const router = useRouter()
  const {toast} = useToast()
  useCheckVersion()

  const [teamData, setTeamData] = useState<TeamData>({
    teamId: "",
    currentPosition: 1,
    currentRoom: "",
    canRollDice: true,
    totalTimeSec: 0,
    status: "ACTIVE",
    timerPaused: false,
  })

  const [gameStatus, setGameStatus] = useState<GameStatus>("IDLE")
  const [currentCheckpoint, setCurrentCheckpoint] = useState<any>(null)
  const [questionData, setQuestionData] = useState<any>(null)
  const [teams, setTeams] = useState<LeaderboardTeam[]>([])
  const [loading, setLoading] = useState(true)
  const [lastDiceValue, setLastDiceValue] = useState(6)
  const [answer, setAnswer] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<any>(null)
  const previousSubmitResultRef = useRef<any>(null)
  const [systemSettings, setSystemSettings] = useState<any>({})
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const teamDataRef = useRef(teamData);

  /* ---------- SCROLL TO TOP ON MANUAL MARKING ---------- */
  useEffect(() => {
    // Scroll to top when manual check is marked by admin
    if (submitResult && !previousSubmitResultRef.current) {
      // If submitResult appears and it's NOT auto-marked, scroll to top
      if (!submitResult.autoMarked) {
        window.scrollTo({top: 0, behavior: 'smooth'})
      }
    }
    previousSubmitResultRef.current = submitResult
  }, [submitResult])

  useEffect(() => {
    if (teamData.status === 'COMPLETED' && teamData.currentPosition === 150) {
      setShowCompletionDialog(true)
    }
  }, [teamData.status, teamData.currentPosition])

  const fetchTeamData = async () => {
    try {
      const username = localStorage.getItem("username")

      const {data} = await apiService.getParticipantState();
      setTeamData(prev => ({
        ...prev,
        teamId: username || localStorage.getItem("teamCode") || "",
        currentPosition: data.currentPosition ?? 1,
        currentRoom: data.currentRoom ?? null,
        canRollDice: data.canRollDice ?? false,
        totalTimeSec: data.totalTimeSec ?? 0,
        status: data.status ?? "ACTIVE",
        timerPaused: data.timerPaused ?? false,
      }))

      let systemSettingsData = await apiService.getSystemSettings();
      setSystemSettings(systemSettingsData.data);

      let checkpointData = await apiService.getPendingCheckpoints();
      checkpointData = checkpointData.data;
      if (!checkpointData) {
        setGameStatus("IDLE")
        setCurrentCheckpoint(null)
        setQuestionData(null)
        return
      }

      setCurrentCheckpoint(checkpointData)

      if (checkpointData.status === "PENDING") {
        setGameStatus("PENDING_APPROVAL")
      }

      if (checkpointData.status === "APPROVED" && checkpointData.questionAssign?.question) {
        setQuestionData((prev: any) => ({
          assignmentId: checkpointData.questionAssign.id,
          question: {
            ...checkpointData.questionAssign.question,
            hint: prev?.question?.hint || null,
          },
          isSnakeDodge: checkpointData.isSnakePosition,
        }));
        setGameStatus("QUESTION_ASSIGNED")
      }

      if (checkpointData.status === "APPROVED" && checkpointData.questionAssign?.participantAnswer) {
        setQuestionData((prev: any) => ({
          assignmentId: checkpointData.questionAssign.id,
          question: {
            ...checkpointData.questionAssign.question,
            hint: prev?.question?.hint || null,
          },
          isSnakeDodge: checkpointData.isSnakePosition,
          participantAnswer: checkpointData.questionAssign.participantAnswer,
        }));
        setGameStatus("SOLVING");
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchTeams = async () => {
    try {
      const {data} = await apiService.getLeaderboard();
      setTeams(
        data.map((t: any) => ({
          id: t.teamCode || t.id,
          position: t.currentPosition,
        }))
      )
    } catch (err) {
      console.error(err)
    }
  }

  const fetchSystemSettings = async () => {
    try {
      const {data} = await apiService.getSystemSettings();
      setSystemSettings(data);
    } catch (err) {
      console.error("Error fetching system settings:", err);
    }
  }

  function incrementTimer() {
    const data = teamDataRef.current;

    if (data.timerPaused) return;
    if (data.currentPosition === 150) return;

    setTeamData(prev => ({
      ...prev,
      totalTimeSec: prev.totalTimeSec + 1,
    }));
  }

  /* ---------- EFFECTS ---------- */

  useEffect(() => {
    teamDataRef.current = teamData;
  }, [teamData]);

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role?.toUpperCase() !== "PARTICIPANT") {
      router.push("/login")
      return
    }

    fetchTeamData()
    fetchTeams()
    fetchSystemSettings();

    const lastDice = localStorage.getItem("lastDiceValue")
    if (lastDice) {
      setLastDiceValue(parseInt(lastDice, 10))
    }

    const lastAnswer = localStorage.getItem("currentAnswer")
    if (lastAnswer) {
      setAnswer(lastAnswer)
    }

    const teamInterval = setInterval(fetchTeamData, 5000)
    const leaderboardInterval = setInterval(fetchTeams, 5000)
    const systemSettingsInterval = setInterval(fetchSystemSettings, 10000);
    const timerInterval = setInterval(incrementTimer, 1000);

    return () => {
      clearInterval(teamInterval)
      clearInterval(leaderboardInterval)
      clearInterval(timerInterval);
      clearInterval(systemSettingsInterval);
    }
  }, [])

  /* ---------- ACTIONS ---------- */

  const handleUseHint = async (assignmentId: string): Promise<void> => {
    if (systemSettings.locked === 'true') return;
    try {
      const {data} = await apiService.useHint(assignmentId);

      if (data?.newTotalTime !== undefined) {
        setTeamData(prev => ({...prev, totalTimeSec: data.newTotalTime}))
      }
      if (data.hint) {
        setQuestionData((prev: any) => ({
          ...prev,
          question: {
            ...prev.question,
            hint: data.hint,
          },
        }));
      }

      toast({
        title: "Hint Used",
        description: "+60 seconds penalty added to your time",
        variant: "default",
      })
    } catch (error) {
      console.error("Error using hint:", error)
      toast({
        title: "Error",
        description: "Failed to use hint. Check your connection.",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleRoll = async () => {
    if (systemSettings.locked === 'true') return;
    setGameStatus("ROLLING")
    try {
      const {data} = await apiService.rollDice();
      setSubmitResult(null);

      setLastDiceValue(data.diceValue);
      localStorage.setItem("lastDiceValue", data.diceValue.toString());

      if (data.invalidRoll) {
        setGameStatus("IDLE");
        toast({
          title: "Too Far!",
          description: `🎲 You need ${150 - data.positionBefore}${data.positionBefore !== 149 ? ' or less' : ''}.`,
          variant: "default",
        })
        return;
      }

      // Extract floor info for display
      const getFloor = (room: string) => {
        const match = room.match(/(\d)\d{2}$/);
        return match ? (parseInt(match[1]) === 1 ? "1st" : "2nd") : "";
      };
      const fromFloor = getFloor(data.positionBefore ? teamData.currentRoom : "");
      const toFloor = getFloor(data.roomAssigned);

      // Update position immediately from dice roll response (don't wait for refetch)
      setTeamData(prev => ({
        ...prev,
        currentPosition: data.positionAfter,
        currentRoom: data.roomAssigned,
        canRollDice: false,
      }))

      // Show dice roll result popup (even at position 150)
      toast({
        title: `🎲 Rolled: ${data.diceValue}`,
        description: `Position ${data.positionBefore} → ${data.positionAfter}${data.hasWon ? ' 🏆 Finish Line!' : ''}${fromFloor && toFloor ? ` | ${fromFloor} → ${toFloor} Floor` : ''}`,
        variant: "default",
        duration: data.hasWon ? 6000 : 4000,
      })

      setGameStatus("PENDING_APPROVAL")

      // Update leaderboard immediately for other teams
      await fetchTeams()
    } catch (err: any) {
      setGameStatus("IDLE")
      toast({
        title: "Error",
        description: err?.message || "Failed to roll dice",
        variant: "destructive",
      })
    }
  }

  const saveAndSetAnswer = (answer: string) => {
    localStorage.setItem("currentAnswer", answer);
    setAnswer(answer);
  }

  const handleSubmitAnswer = async () => {
    if (systemSettings.locked === 'true') return;
    if (!answer.trim() || !questionData?.assignmentId) return

    setSubmitting(true)

    try {
      const {data} = await apiService.submitAnswer(questionData.assignmentId, answer)

      setSubmitResult(data)
      setAnswer("")
      setGameStatus("IDLE")
      setTeamData(prev => ({...prev, canRollDice: true}))

      // Immediate refetch for faster feedback
      await Promise.all([fetchTeamData(), fetchTeams()])

      // Scroll to top after submission
      // For auto-check (NUMERICAL/MCQ): scroll immediately
      // For manual-check (CODING/PHYSICAL): scroll will happen when marked by admin
      if (data.autoMarked) {
        window.scrollTo({top: 0, behavior: 'smooth'})
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  /* ---------- UI ---------- */

  if (loading) {
    return (
      <div className="fixed inset-0 overflow-hidden bg-black">
        {/* Background Image */}
        <Image
          src="/background.svg"
          alt="Background"
          fill
          priority
          className="object-cover object-top"
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`}

        />

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center mx-16">
          <div
            className="flex flex-col items-center justify-center text-center w-screen p-8 md:w-160"
            style={{
              borderRadius: 70,
              background: "rgba(255,255,255,0.10)",
              boxShadow: "0 2px 32px 0 rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.7)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div
              className={`text-lg md:text-xl font-light mb-2 text-[#D1883F] ${mayak.className}`}
            >
              Welcome to
            </div>

            <div
              className={`text-[7rem] font-extrabold text-[#D7CFC2] ${venom.className} tracking-tight leading-36`}
            >
              VENOM
            </div>

            <div className={`text-[#D1883F] ${mayak.className}`}>
              The IEEE CS Edition of Snakes and Ladders
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (systemSettings.locked === "true") {
    return (
      <div className="fixed inset-0 overflow-hidden bg-black">
        {/* Background Image */}
        <Image
          src="/background.svg"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`}
        />

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center mx-16">
          <div
            className="flex flex-col items-center justify-center text-center w-[90vw] p-8"
            style={{
              borderRadius: 70,
              background: "rgba(255,255,255,0.10)",
              boxShadow: "0 2px 32px 0 rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.7)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div
              className={`text-lg md:text-xl font-light mb-2 text-[#D1883F] ${mayak.className}`}
            >
              Welcome to
            </div>

            <div
              className={`text-[7rem] font-extrabold text-[#D7CFC2] ${venom.className} tracking-tight leading-36`}
            >
              VENOM
            </div>

            <div className={`text-[#D1883F] ${mayak.className}`}>
              Game locked. Kindly wait for the organizers to start the game.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (systemSettings.gameOver === "true") {
    return (
      <div className="fixed inset-0 overflow-hidden bg-black">
        {/* Background Image */}
        <Image
          src="/background.svg"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`}
        />

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center mx-16">
          <div
            className="flex flex-col items-center justify-center text-center w-[90vw] p-8"
            style={{
              borderRadius: 70,
              background: "rgba(255,255,255,0.10)",
              boxShadow: "0 2px 32px 0 rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.7)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div
              className={`text-[7rem] font-extrabold text-[#D7CFC2] ${venom.className} tracking-tight leading-36`}
            >
              VENOM
            </div>

            <div className={`text-[#D1883F] ${mayak.className}`}>
              Thank you for participating! The game is now over.
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <motion.div
      className="min-h-screen flex flex-col bg-white"
      initial={{y: "100vh"}}
      animate={{y: 0}}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 20,
      }}
    >
      <Header teamId={teamData.teamId}/>

      <StatusStrip
        currentPosition={teamData.currentPosition}
        roomNumber={teamData.currentRoom || "—"}
        status={gameStatus}
        totalTimeSec={teamData.totalTimeSec}
        timerPaused={teamData.timerPaused}
      />

      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Dice
              onRoll={handleRoll}
              canRoll={teamData.canRollDice && gameStatus === "IDLE" && teamData.currentPosition < 150 && teamData.status !== 'COMPLETED'}
              isRolling={gameStatus === "ROLLING"}
              lastValue={lastDiceValue}
            />

            <Board
              currentPosition={teamData.currentPosition}
              teamId={teamData.teamId}
            />

            <TeamsList teams={teams}/>
          </div>

          <QuestionPanel
            gameStatus={gameStatus}
            checkpoint={currentCheckpoint}
            questionData={questionData}
            answer={answer}
            setAnswer={saveAndSetAnswer}
            submitting={submitting}
            submitResult={submitResult}
            handleSubmitAnswer={handleSubmitAnswer}
            onUseHint={handleUseHint}
          />
        </div>
      </main>

      <Toaster/>

      {/* Game Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-green-600">
              🎉 Congratulations! 🎉
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-3">
            <div className="text-xl font-semibold">Game Completed!</div>
            <div>Team {teamData.teamId} has successfully reached position 150! Report to room AB1-010.</div>
            <div className="pt-2 text-4xl">🏆</div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
