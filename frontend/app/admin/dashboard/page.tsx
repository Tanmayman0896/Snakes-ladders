"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"

interface Team {
  id: string
  members: string[]
  currentPosition: number
  currentRoom: number
  status: "active" | "completed"
  totalTime: number
  checkpoints: Array<{
    position: number
    checkpointApproved: boolean
    questionId: string | null
    questionAssigned: boolean
    answerStatus: "pending" | "correct" | "incorrect" | null
  }>
}

export default function AdminDashboard() {
  const router = useRouter()
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "TEAM001",
      members: ["Member1", "Member2"],
      currentPosition: 25,
      currentRoom: 3,
      status: "active",
      totalTime: 1200,
      checkpoints: [
        { position: 1, checkpointApproved: true, questionId: "Q001", questionAssigned: true, answerStatus: "correct" },
        { position: 6, checkpointApproved: true, questionId: "Q002", questionAssigned: true, answerStatus: "pending" },
        { position: 12, checkpointApproved: false, questionId: null, questionAssigned: false, answerStatus: null },
      ],
    },
    {
      id: "TEAM002",
      members: ["Member3", "Member4"],
      currentPosition: 15,
      currentRoom: 2,
      status: "active",
      totalTime: 900,
      checkpoints: [
        { position: 1, checkpointApproved: true, questionId: "Q003", questionAssigned: true, answerStatus: "correct" },
        { position: 5, checkpointApproved: true, questionId: null, questionAssigned: false, answerStatus: null },
      ],
    },
  ])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [selectedCheckpointIndex, setSelectedCheckpointIndex] = useState<number | null>(null)
  const [selectedQuestion, setSelectedQuestion] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      router.push("/login")
    }
  }, [router])

  const questions = ["Q001", "Q002", "Q003", "Q004", "Q005", "Q006", "Q007", "Q008", "Q009", "Q010"]

  // Step 1: Approve checkpoint (team has reached the checkpoint)
  const handleApproveCheckpoint = (teamId: string, checkpointIndex: number) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId
          ? {
              ...team,
              checkpoints: team.checkpoints.map((checkpoint, idx) =>
                idx === checkpointIndex ? { ...checkpoint, checkpointApproved: true } : checkpoint,
              ),
            }
          : team,
      ),
    )
  }

  // Step 2: Assign question (only after checkpoint is approved)
  const handleAssignQuestion = () => {
    if (!selectedTeam || selectedCheckpointIndex === null || !selectedQuestion) return

    setTeams((prev) =>
      prev.map((team) =>
        team.id === selectedTeam.id
          ? {
              ...team,
              checkpoints: team.checkpoints.map((checkpoint, idx) =>
                idx === selectedCheckpointIndex
                  ? { ...checkpoint, questionId: selectedQuestion, questionAssigned: true, answerStatus: "pending" }
                  : checkpoint,
              ),
            }
          : team,
      ),
    )

    setShowQuestionModal(false)
    setSelectedQuestion("")
    setSelectedCheckpointIndex(null)
    setSelectedTeam(null)
  }

  // Step 3: Mark answer as correct or incorrect
  const handleMarkAnswer = (teamId: string, checkpointIndex: number, isCorrect: boolean) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId
          ? {
              ...team,
              checkpoints: team.checkpoints.map((checkpoint, idx) =>
                idx === checkpointIndex
                  ? { ...checkpoint, answerStatus: isCorrect ? "correct" : "incorrect" }
                  : checkpoint,
              ),
            }
          : team,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="admin" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Management</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Team ID..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* Teams List */}
        <div className="space-y-4">
          {teams
            .filter((team) => team.id.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((team) => (
            <div key={team.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase">Team ID</p>
                  <p className="font-bold text-gray-900">{team.id}</p>
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
                <div>
                  <p className="text-xs text-gray-600 uppercase">Time (sec)</p>
                  <p className="font-bold text-gray-900">{team.totalTime}</p>
                </div>
              </div>

              {/* Checkpoints */}
              <div className="mb-4 bg-gray-50 p-3 rounded">
                <p className="text-sm font-semibold text-gray-700 mb-2">Checkpoints</p>
                <div className="space-y-2">
                  {team.checkpoints.length > 0 ? (
                    team.checkpoints.map((checkpoint, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3 rounded border border-gray-200"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Checkpoint {checkpoint.position}
                          </span>
                          
                          {/* Step 1: Checkpoint Approval Status */}
                          {!checkpoint.checkpointApproved ? (
                            <button
                              onClick={() => handleApproveCheckpoint(team.id, idx)}
                              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-medium"
                            >
                              Approve Checkpoint
                            </button>
                          ) : (
                            <span className="text-xs text-green-600 font-medium">✓ Checkpoint Approved</span>
                          )}
                        </div>

                        {/* Step 2: Question Assignment (only show if checkpoint is approved) */}
                        {checkpoint.checkpointApproved && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            {!checkpoint.questionAssigned ? (
                              <button
                                onClick={() => {
                                  setSelectedTeam(team)
                                  setSelectedCheckpointIndex(idx)
                                  setShowQuestionModal(true)
                                }}
                                className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors font-medium"
                              >
                                Assign Question
                              </button>
                            ) : (
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">
                                  Question: <span className="font-medium text-gray-800">{checkpoint.questionId}</span>
                                </span>

                                {/* Step 3: Mark Answer (only show if question is assigned) */}
                                {checkpoint.answerStatus === "pending" ? (
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleMarkAnswer(team.id, idx, true)}
                                      className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors font-medium"
                                    >
                                      ✓ Correct
                                    </button>
                                    <button
                                      onClick={() => handleMarkAnswer(team.id, idx, false)}
                                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors font-medium"
                                    >
                                      ✗ Incorrect
                                    </button>
                                  </div>
                                ) : (
                                  <span
                                    className={`text-xs font-medium ${
                                      checkpoint.answerStatus === "correct" ? "text-green-600" : "text-red-600"
                                    }`}
                                  >
                                    {checkpoint.answerStatus === "correct" ? "✓ Correct" : "✗ Incorrect"}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">No checkpoints yet</p>
                  )}
                </div>
              </div>

              {/* Add New Checkpoint Button */}
              <button
                onClick={() => {
                  setTeams((prev) =>
                    prev.map((t) =>
                      t.id === team.id
                        ? {
                            ...t,
                            checkpoints: [
                              ...t.checkpoints,
                              {
                                position: t.checkpoints.length + 1,
                                checkpointApproved: false,
                                questionId: null,
                                questionAssigned: false,
                                answerStatus: null,
                              },
                            ],
                          }
                        : t,
                    ),
                  )
                }}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded font-medium hover:bg-gray-700 transition-colors text-sm"
              >
                + Add New Checkpoint
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Question Modal */}
      {showQuestionModal && selectedTeam && selectedCheckpointIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Assign Question to {selectedTeam.id} - Checkpoint {selectedTeam.checkpoints[selectedCheckpointIndex]?.position}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Question</label>
                <select
                  value={selectedQuestion}
                  onChange={(e) => setSelectedQuestion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                >
                  <option value="">Choose a question</option>
                  {questions.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowQuestionModal(false)
                  setSelectedQuestion("")
                  setSelectedCheckpointIndex(null)
                  setSelectedTeam(null)
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium text-sm hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignQuestion}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded font-medium text-sm hover:bg-gray-700 transition-colors"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
