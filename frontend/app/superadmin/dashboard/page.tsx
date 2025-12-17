"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"

interface Team {
  id: string
  members: string[]
  currentPosition: number
  currentRoom: number
  totalTime: number
  disqualified: boolean
}

interface Question {
  id: string
  text: string
  difficulty: "easy" | "medium" | "hard"
}

interface ActivityLog {
  id: string
  userId: string
  userRole: "admin" | "superadmin" | "participant"
  action: string
  details: string
  timestamp: string
}

export default function SuperAdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("leaderboard")
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "TEAM001",
      members: ["Member1", "Member2"],
      currentPosition: 25,
      currentRoom: 3,
      totalTime: 1200,
      disqualified: false,
    },
    {
      id: "TEAM002",
      members: ["Member3", "Member4"],
      currentPosition: 15,
      currentRoom: 2,
      totalTime: 900,
      disqualified: false,
    },
    {
      id: "TEAM003",
      members: ["Member5", "Member6"],
      currentPosition: 50,
      currentRoom: 5,
      totalTime: 2100,
      disqualified: false,
    },
  ])
  const [questions, setQuestions] = useState<Question[]>([
    { id: "Q001", text: "What is a closure in JavaScript?", difficulty: "medium" },
    { id: "Q002", text: "Explain async/await", difficulty: "hard" },
    { id: "Q003", text: "What is React Hooks?", difficulty: "medium" },
  ])
  const [showNewTeamModal, setShowNewTeamModal] = useState(false)
  const [showNewQuestionModal, setShowNewQuestionModal] = useState(false)
  const [newTeamId, setNewTeamId] = useState("")
  const [newTeamMembers, setNewTeamMembers] = useState("")
  const [newTeamPassword, setNewTeamPassword] = useState("")
  const [newQuestion, setNewQuestion] = useState("")
  const [newQuestionDifficulty, setNewQuestionDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [selectedTeamForEdit, setSelectedTeamForEdit] = useState<string | null>(null)
  const [newRoom, setNewRoom] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: "LOG001",
      userId: "SUPER001",
      userRole: "superadmin",
      action: "Login",
      details: "SuperAdmin logged in",
      timestamp: "2025-12-17 10:30:00",
    },
    {
      id: "LOG002",
      userId: "ADMIN001",
      userRole: "admin",
      action: "Login",
      details: "Admin logged in",
      timestamp: "2025-12-17 10:35:00",
    },
    {
      id: "LOG003",
      userId: "ADMIN001",
      userRole: "admin",
      action: "Update",
      details: "Approved checkpoint for TEAM001",
      timestamp: "2025-12-17 10:40:00",
    },
    {
      id: "LOG004",
      userId: "SUPER001",
      userRole: "superadmin",
      action: "Create",
      details: "Created new team TEAM003",
      timestamp: "2025-12-17 10:45:00",
    },
    {
      id: "LOG005",
      userId: "TEAM001",
      userRole: "participant",
      action: "Login",
      details: "Participant TEAM001 logged in",
      timestamp: "2025-12-17 11:00:00",
    },
    {
      id: "LOG006",
      userId: "ADMIN001",
      userRole: "admin",
      action: "Update",
      details: "Assigned question Q002 to TEAM002",
      timestamp: "2025-12-17 11:15:00",
    },
    {
      id: "LOG007",
      userId: "SUPER001",
      userRole: "superadmin",
      action: "Update",
      details: "Changed room for TEAM001 to Room 3",
      timestamp: "2025-12-17 11:20:00",
    },
  ])
  const [generatedPasswords, setGeneratedPasswords] = useState<Record<string, string>>({})

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "superadmin") {
      router.push("/login")
    }
  }, [router])

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let password = ""
    for (let i = 0; i < 5; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const handleGeneratePassword = (teamId: string) => {
    const newPassword = generateRandomPassword()
    setGeneratedPasswords((prev) => ({ ...prev, [teamId]: newPassword }))
  }

  const handleCreateTeam = () => {
    if (!newTeamId || !newTeamMembers || !newTeamPassword) return

    setTeams([
      ...teams,
      {
        id: newTeamId,
        members: newTeamMembers.split(",").map((m) => m.trim()),
        currentPosition: 1,
        currentRoom: 0,
        totalTime: 0,
        disqualified: false,
      },
    ])

    setNewTeamId("")
    setNewTeamMembers("")
    setNewTeamPassword("")
    setShowNewTeamModal(false)
  }

  const handleAddQuestion = () => {
    if (!newQuestion) return

    const newId = `Q${String(questions.length + 1).padStart(3, "0")}`
    setQuestions([...questions, { id: newId, text: newQuestion, difficulty: newQuestionDifficulty }])

    setNewQuestion("")
    setNewQuestionDifficulty("medium")
    setShowNewQuestionModal(false)
  }

  const handleDisqualifyTeam = (teamId: string) => {
    setTeams((prev) => prev.map((team) => (team.id === teamId ? { ...team, disqualified: !team.disqualified } : team)))
  }

  const handleChangeRoom = (teamId: string) => {
    if (!newRoom) return

    setTeams((prev) => prev.map((team) => (team.id === teamId ? { ...team, currentRoom: Number(newRoom) } : team)))

    setSelectedTeamForEdit(null)
    setNewRoom("")
  }

  const handleRemoveQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId))
  }

  // Calculate leaderboard
  const leaderboard = [...teams]
    .filter((t) => !t.disqualified)
    .sort((a, b) => b.currentPosition - a.currentPosition || a.totalTime - b.totalTime)

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="superadmin" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "leaderboard"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab("teams")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "teams" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Teams
          </button>
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "questions"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Questions
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "activity"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Activity Log
          </button>
        </div>

        {activeTab === "leaderboard" && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Rank</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Team ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Position</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Points</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Time (sec)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaderboard.map((team, idx) => (
                    <tr key={team.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 font-bold">{idx + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{team.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{team.currentPosition}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{team.currentRoom}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{team.totalTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "teams" && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Teams</h2>
              <button
                onClick={() => setShowNewTeamModal(true)}
                className="px-4 py-2 bg-gray-800 text-white rounded font-medium hover:bg-gray-700 transition-colors"
              >
                + Create Team
              </button>
            </div>

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

            <div className="space-y-3">
              {teams
                .filter((team) => team.id.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((team) => (
                <div
                  key={team.id}
                  className={`border rounded-lg p-4 ${
                    team.disqualified ? "bg-red-50 border-red-200" : "border-gray-200"
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 uppercase">Team ID</p>
                      <p className="font-bold text-gray-900">{team.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase">Position</p>
                      <p className="font-bold text-gray-900">{team.currentPosition}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase">Points</p>
                      <p className="font-bold text-gray-900">{team.currentRoom}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase">Time (sec)</p>
                      <p className="font-bold text-gray-900">{team.totalTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase">Status</p>
                      <p className={`font-bold ${team.disqualified ? "text-red-600" : "text-green-600"}`}>
                        {team.disqualified ? "Disqualified" : "Active"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedTeamForEdit === team.id ? (
                      <div className="flex gap-2 w-full">
                        <input
                          type="number"
                          value={newRoom}
                          onChange={(e) => setNewRoom(e.target.value)}
                          placeholder="New room number"
                          className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-600"
                        />
                        <button
                          onClick={() => handleChangeRoom(team.id)}
                          className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors font-medium"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTeamForEdit(null)
                            setNewRoom("")
                          }}
                          className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setSelectedTeamForEdit(team.id)
                            setNewRoom(String(team.currentRoom))
                          }}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-medium"
                        >
                          Change Room
                        </button>
                        <button
                          onClick={() => handleDisqualifyTeam(team.id)}
                          className={`px-3 py-1 text-sm rounded font-medium transition-colors ${
                            team.disqualified
                              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {team.disqualified ? "Reactivate" : "Disqualify"}
                        </button>
                        <button
                          onClick={() => handleGeneratePassword(team.id)}
                          className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors font-medium"
                        >
                          Generate Password
                        </button>
                      </>
                    )}
                  </div>

                  {/* Generated Password Display */}
                  {generatedPasswords[team.id] && (
                    <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded flex justify-between items-center">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">New Password:</span>{" "}
                        <span className="font-mono font-bold">{generatedPasswords[team.id]}</span>
                      </p>
                      <button
                        onClick={() => setGeneratedPasswords((prev) => {
                          const newPasswords = { ...prev }
                          delete newPasswords[team.id]
                          return newPasswords
                        })}
                        className="text-green-700 hover:text-green-900 text-sm font-medium"
                      >
                        ✕ Hide
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "questions" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Question Bank</h2>
              <button
                onClick={() => setShowNewQuestionModal(true)}
                className="px-4 py-2 bg-gray-800 text-white rounded font-medium hover:bg-gray-700 transition-colors"
              >
                + Add Question
              </button>
            </div>

            <div className="space-y-2">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="flex justify-between items-start p-3 border border-gray-200 rounded hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{question.id}</p>
                    <p className="text-gray-700 text-sm mt-1">{question.text}</p>
                    <div className="mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          question.difficulty === "easy"
                            ? "bg-green-100 text-green-700"
                            : question.difficulty === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveQuestion(question.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Activity Log</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Timestamp</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">User ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activityLogs
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-600">{log.timestamp}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{log.userId}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              log.userRole === "superadmin"
                                ? "bg-purple-100 text-purple-700"
                                : log.userRole === "admin"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {log.userRole}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              log.action === "Login"
                                ? "bg-gray-100 text-gray-700"
                                : log.action === "Create"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{log.details}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Create Team Modal */}
      {showNewTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Team</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team ID</label>
                <input
                  type="text"
                  value={newTeamId}
                  onChange={(e) => setNewTeamId(e.target.value)}
                  placeholder="TEAM001"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Members (comma separated)</label>
                <input
                  type="text"
                  value={newTeamMembers}
                  onChange={(e) => setNewTeamMembers(e.target.value)}
                  placeholder="Member1, Member2"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={newTeamPassword}
                  onChange={(e) => setNewTeamPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewTeamModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium text-sm hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTeam}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded font-medium text-sm hover:bg-gray-700 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showNewQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Question</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Enter question..."
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={newQuestionDifficulty}
                  onChange={(e) => setNewQuestionDifficulty(e.target.value as "easy" | "medium" | "hard")}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewQuestionModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium text-sm hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuestion}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded font-medium text-sm hover:bg-gray-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
