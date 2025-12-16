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
  checkpoints: Array<{ position: number; questionId: string; approved: boolean }>
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
        { position: 1, questionId: "Q001", approved: true },
        { position: 6, questionId: "Q002", approved: false },
      ],
    },
    {
      id: "TEAM002",
      members: ["Member3", "Member4"],
      currentPosition: 15,
      currentRoom: 2,
      status: "active",
      totalTime: 900,
      checkpoints: [{ position: 1, questionId: "Q003", approved: true }],
    },
  ])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [selectedQuestionPosition, setSelectedQuestionPosition] = useState<number | null>(null)
  const [selectedQuestion, setSelectedQuestion] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      router.push("/login")
    }
  }, [router])

  const questions = ["Q001", "Q002", "Q003", "Q004", "Q005", "Q006", "Q007", "Q008", "Q009", "Q010"]

  const handleAssignQuestion = () => {
    if (!selectedTeam || !selectedQuestionPosition || !selectedQuestion) return

    setTeams((prev) =>
      prev.map((team) =>
        team.id === selectedTeam.id
          ? {
              ...team,
              checkpoints: [
                ...team.checkpoints,
                {
                  position: selectedQuestionPosition,
                  questionId: selectedQuestion,
                  approved: isCorrect,
                },
              ],
            }
          : team,
      ),
    )

    setShowQuestionModal(false)
    setSelectedQuestion("")
    setIsCorrect(false)
    setSelectedQuestionPosition(null)
  }

  const handleApproveCheckpoint = (teamId: string, checkpointIndex: number) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId
          ? {
              ...team,
              checkpoints: team.checkpoints.map((checkpoint, idx) =>
                idx === checkpointIndex ? { ...checkpoint, approved: true } : checkpoint,
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

        {/* Teams List */}
        <div className="space-y-4">
          {teams.map((team) => (
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
                        className="flex justify-between items-center text-sm bg-white p-2 rounded border border-gray-200"
                      >
                        <span className="text-gray-700">
                          Checkpoint {checkpoint.position} → {checkpoint.questionId}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${checkpoint.approved ? "text-green-600" : "text-yellow-600"}`}>
                            {checkpoint.approved ? "✓ Approved" : "⏳ Pending"}
                          </span>
                          {!checkpoint.approved && (
                            <button
                              onClick={() => handleApproveCheckpoint(team.id, idx)}
                              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">No checkpoints yet</p>
                  )}
                </div>
              </div>

              {/* Assign Question Button */}
              <button
                onClick={() => {
                  setSelectedTeam(team)
                  setShowQuestionModal(true)
                }}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded font-medium hover:bg-gray-700 transition-colors text-sm"
              >
                Assign Question
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Question Modal */}
      {showQuestionModal && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Assign Question to {selectedTeam.id}</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Checkpoint Position</label>
                <input
                  type="number"
                  value={selectedQuestionPosition || ""}
                  onChange={(e) => setSelectedQuestionPosition(Number(e.target.value))}
                  placeholder="e.g., 6"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                />
              </div>

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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="correct"
                  checked={isCorrect}
                  onChange={(e) => setIsCorrect(e.target.checked)}
                  className="rounded border-gray-300 text-gray-800 focus:ring-gray-600"
                />
                <label htmlFor="correct" className="ml-2 text-sm text-gray-700">
                  Mark as Correct
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowQuestionModal(false)}
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
