"use client"

import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Navbar} from "@/components/navbar"
import {apiService} from "@/lib/service";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {mayak, venom} from "@/app/fonts";

interface Checkpoint {
  id: string
  checkpointNumber: number
  positionBefore?: number
  positionAfter?: number
  position?: number
  roomNumber?: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  isSnakePosition?: boolean
  questionAssign?: {
    id: string
    questionId: string
    status: "PENDING" | "CORRECT" | "INCORRECT"
    participantAnswer?: string
    submittedAt?: string
    question?: {
      id: string
      content: string
      type?: "CODING" | "NUMERICAL" | "MCQ" | "PHYSICAL"
      options?: string[]
      correctAnswer?: string
    }
  } | null
}

interface Team {
  id: string
  teamCode: string
  teamName: string
  teamId: string  // User's username like "TEAM001"
  members: Array<{ name: string }>
  currentPosition: number
  currentRoom: string
  status: string
  totalTimeSec: number
  timerPaused?: boolean
  checkpoints: Checkpoint[]
}

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

export default function AdminDashboard() {
  const router = useRouter()
  const [teams, setTeams] = useState<Team[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [teamOffsets, setTeamOffsets] = useState<Record<string, number>>({});
  const [expanding, setExpanding] = useState<boolean>(false);
  const [systemSettings, setSystemSettings] = useState<any>({});

  function mergeCheckpoints(
    existing: Checkpoint[] = [],
    incoming: Checkpoint[] = []
  ): Checkpoint[] {
    const map = new Map<string, Checkpoint>();

    existing.forEach(cp => map.set(cp.id, cp));
    incoming.forEach(cp => map.set(cp.id, cp));

    return Array.from(map.values()).sort(
      (a, b) => b.checkpointNumber - a.checkpointNumber
    );
  }


  // Fetch teams from backend
  const fetchTeams = async () => {
    try {
      const {data} = await apiService.fetchTeams(false);

      setTeams(prevTeams =>
        data.map((t: any) => {
          const existingTeam = prevTeams.find(pt => pt.id === t.id);

          return {
            ...t,
            teamId: t.user?.username || t.teamCode,
            checkpoints: mergeCheckpoints(
              existingTeam?.checkpoints,
              t.checkpoints
            ),
          };
        })
      );
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemSettings = async () => {
    try {
      const {data} = await apiService.getSystemSettings();
      setSystemSettings(data);
    } catch (err) {
      console.error("Error fetching system settings:", err);
    }
  }

  function collapseCheckpoints(teamId: string) {
    const offset = (teamOffsets[teamId] ?? 0) - 10;
    setTeams(prevTeams =>
      prevTeams.map(team => {
        if (team.id !== teamId) return team;

        return {
          ...team,
          checkpoints: team.checkpoints.slice(0, 1),
        };
      })
    );

    setTeamOffsets(prev => ({
      ...prev,
      [teamId]: offset,
    }));
  }

  useEffect(() => {
    fetchSystemSettings();
    fetchTeams()
    // Auto-refresh teams every 3 seconds for real-time checkpoint visibility
    const interval = setInterval(fetchTeams, 3000)
    const systemSettingsInterval = setInterval(fetchSystemSettings, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(systemSettingsInterval);
    }
  }, [router])


  // Approve checkpoint via API
  async function loadMoreCheckpoints(teamId: string) {
    const offset = (teamOffsets[teamId] ?? -10) + 10;
    setExpanding(true);
    const {data: newCheckpoints} =
      await apiService.loadMoreCheckpoints(teamId, offset);

    // Update teams state
    setTeams(prevTeams =>
      prevTeams.map(team => {
        if (team.id !== teamId) return team;

        return {
          ...team,
          checkpoints: mergeCheckpoints(
            team.checkpoints || 0,
            newCheckpoints
          ),
        };
      })
    );
    setExpanding(false);

    // Update offset for this team
    setTeamOffsets(prev => ({
      ...prev,
      [teamId]: offset,
    }));
  }

  const handleApproveCheckpoint = async (checkpointId: string) => {
    try {
      await apiService.approveCheckpoint(checkpointId);
      alert('Checkpoint approved successfully!');
      await fetchTeams();
    } catch (error) {
      console.error("Error approving checkpoint:", error)
      alert("Failed to approve checkpoint")
    }
  }

  // Mark answer as correct or incorrect via API
  const handleMarkAnswer = async (checkpointId: string, isCorrect: boolean) => {
    try {
      await apiService.markAnswer(checkpointId, isCorrect);
      alert(`Answer marked as ${isCorrect ? 'correct' : 'incorrect'}!`)
      await fetchTeams();
    } catch (error) {
      console.error("Error marking answer:", error)
      alert("Failed to mark answer")
    }
  }

  // Delete checkpoint
  const handleDeleteCheckpoint = async (checkpointId: string, checkpointNumber: number) => {
    if (!confirm(`Are you sure you want to delete Checkpoint #${checkpointNumber}? This action cannot be undone.`)) {
      return
    }

    try {
      await apiService.deleteCheckpoint(checkpointId);
      await fetchTeams();
      alert("Checkpoint deleted successfully!")
    } catch (error) {
      console.error("Error deleting checkpoint:", error)
      alert("Failed to delete checkpoint")
    }
  }

  // Pause team timer
  const handlePauseTimer = async (teamId: string) => {
    try {
      await apiService.pauseTimer(teamId);
      await fetchTeams();
      alert("Timer paused successfully!")
    } catch (error) {
      console.error("Error pausing timer:", error)
      alert("Failed to pause timer")
    }
  }

  // Resume team timer
  const handleResumeTimer = async (teamId: string) => {
    try {
      await apiService.resumeTimer(teamId);
      await fetchTeams();
      alert("Timer resumed successfully!")
    } catch (error) {
      console.error("Error resuming timer:", error)
      alert("Failed to resume timer")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar role="admin"/>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">Loading teams...</p>
        </div>
      </div>
    )
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


  const filteredTeams = teams.filter(
    (team) =>
      (team.teamId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.teamCode || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.teamName || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="admin"/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Management</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Team Name or Code..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* Teams List */}
        <div className="space-y-4">
          {filteredTeams.length === 0 ? (
            <p className="text-gray-500">No teams found in your room.</p>
          ) : (
            filteredTeams.map((team) => (
              <div key={team.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Team ID</p>
                    <p className="font-bold text-gray-900">{team.teamId || team.teamCode || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Team Name</p>
                    <p className="font-bold text-gray-900">{team.teamName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Position</p>
                    <p className="font-bold text-gray-900">{team.currentPosition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Room</p>
                    <p className="font-bold text-gray-900">{team.currentRoom}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Status</p>
                    <p className="font-bold text-gray-900 capitalize">{team.status}</p>
                  </div>
                </div>

                {/* Members */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 uppercase mb-1">Members</p>
                  <p className="text-sm text-gray-800">
                    {team.members.map((m) => m.name).join(", ") || "No members"}
                  </p>
                </div>

                {/* Checkpoints */}
                <div className="mb-4 bg-gray-50 p-3 rounded">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Checkpoints</p>
                  <div className="space-y-2">
                    {team.checkpoints.length > 0 ? (
                      team.checkpoints.map((checkpoint) => (
                        <div
                          key={checkpoint.id}
                          className="bg-white p-3 rounded border border-gray-200"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Checkpoint #{checkpoint.checkpointNumber} (Position {checkpoint.positionAfter || checkpoint.position})
                              {checkpoint.isSnakePosition && (
                                <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">
                                  🐍 Snake
                                </span>
                              )}
                            </span>

                            {/* Step 1: Checkpoint Approval Status */}
                            {checkpoint.status === "PENDING" ? (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleApproveCheckpoint(checkpoint.id)}
                                  className="px-3 py-1 text-xs bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors font-medium"
                                >
                                  Approve Checkpoint
                                </button>
                                <button
                                  onClick={() => handleDeleteCheckpoint(checkpoint.id, checkpoint.checkpointNumber)}
                                  className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
                                  title="Delete this checkpoint"
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            ) : checkpoint.status === "APPROVED" ? (
                              <span className="text-xs text-green-600 font-medium">✓ Checkpoint Approved</span>
                            ) : (
                              <span className="text-xs text-red-600 font-medium">✗ Rejected</span>
                            )}
                          </div>

                          {/* Step 2: Show Pre-assigned Question */}
                          {checkpoint.questionAssign && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <div className="mb-2">
                                <p className="text-xs text-gray-600 uppercase mb-1">Auto-Assigned Question</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">
                                    {checkpoint.questionAssign.question?.type || 'N/A'}
                                  </span>
                                  <p
                                    className="text-xs text-gray-700">{checkpoint.questionAssign.question?.content || 'Question content unavailable'}</p>
                                </div>
                              </div>

                              {/* Step 3: Mark Answer (only show if checkpoint is approved and question assigned) */}
                              {checkpoint.status === "APPROVED" && checkpoint.questionAssign.status === "PENDING" ? (
                                <div className="flex flex-col gap-2 mt-2">
                                  {!checkpoint.questionAssign.participantAnswer && (
                                    <p className="text-xs text-amber-600">⏳ Waiting for participant to submit
                                      answer...</p>
                                  )}
                                  {checkpoint.questionAssign.participantAnswer && (
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => handleMarkAnswer(checkpoint.id, true)}
                                        className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors font-medium"
                                      >
                                        ✓ Correct
                                      </button>
                                      <button
                                        onClick={() => handleMarkAnswer(checkpoint.id, false)}
                                        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors font-medium"
                                      >
                                        ✗ Incorrect
                                      </button>
                                    </div>
                                  )}

                                  {/* Timer controls for CODING/PHYSICAL questions */}
                                  {(checkpoint.questionAssign.question?.type === "CODING" || checkpoint.questionAssign.question?.type === "PHYSICAL") && (
                                    <div className="flex gap-2 mt-1">
                                      {team.timerPaused ? (
                                        <button
                                          onClick={() => handleResumeTimer(team.id)}
                                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-medium"
                                        >
                                          ▶️ Resume Timer
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => handlePauseTimer(team.id)}
                                          className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors font-medium"
                                        >
                                          ⏸️ Pause Timer
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ) : checkpoint.questionAssign.status !== "PENDING" ? (
                                <span className="text-xs font-medium text-gray-600">
                                  Marked
                                </span>
                              ) : null}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500">No checkpoints yet</p>
                    )}
                    {team.checkpoints.at(-1)?.checkpointNumber === 1 ?
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => collapseCheckpoints(team.id)}
                      >Collapse</Button>
                      :
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        disabled={expanding}
                        onClick={() => loadMoreCheckpoints(team.id)}
                      >{expanding ? 'Loading...' : 'Expand'}</Button>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
