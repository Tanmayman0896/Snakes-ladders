"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {
  AlertTriangle,
  Calculator,
  CheckCircle,
  Code,
  Dumbbell,
  FileText,
  HelpCircle,
  List,
  Upload,
  XCircle
} from "lucide-react"

export type GameStatus =
  | "IDLE"
  | "ROLLING"
  | "PENDING_APPROVAL"
  | "QUESTION_ASSIGNED"
  | "SOLVING"
  | "LOCKED"

interface QuestionPanelProps {
  gameStatus: GameStatus
  checkpoint: any
  questionData: any
  answer: any
  setAnswer: (answer: string) => void
  handleSubmitAnswer: () => Promise<void>
  submitResult: { autoMarked?: boolean; isCorrect?: boolean; message?: string } | null,
  submitting: boolean
  onUseHint: (assignmentId: string) => Promise<void>
}

export function QuestionPanel({
    answer,
    setAnswer,
    submitResult,
    gameStatus,
    checkpoint,
    submitting,
    questionData,
    handleSubmitAnswer,
    onUseHint,
  }: QuestionPanelProps) {
  const [showHint, setShowHint] = useState(false)
  const [usingHint, setUsingHint] = useState(false)

  const handleHintClick = async () => {
    if (!showHint && questionData?.assignmentId) {
      setUsingHint(true)
      try {
        await onUseHint(questionData.assignmentId)
        setShowHint(true)
      } catch (error) {
        console.error("Error using hint:", error)
      }
      setUsingHint(false)
    } else {
      setShowHint(!showHint)
    }
  }

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "CODING":
        return <Code className="w-4 h-4"/>
      case "NUMERICAL":
        return <Calculator className="w-4 h-4"/>
      case "MCQ":
        return <List className="w-4 h-4"/>
      case "PHYSICAL":
        return <Dumbbell className="w-4 h-4"/>
      default:
        return <FileText className="w-4 h-4"/>
    }
  }

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "CODING":
        return "Coding"
      case "NUMERICAL":
        return "Numerical"
      case "MCQ":
        return "Multiple Choice"
      case "PHYSICAL":
        return "Physical Task"
      default:
        return type
    }
  }

  if (gameStatus === "IDLE" || gameStatus === "ROLLING") {
    return (
      <div
        className="rounded-lg bg-white border border-gray-200 p-4 sm:p-6 h-full flex items-center justify-center shadow-sm">
        <div className="text-center space-y-2 sm:space-y-3">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600"/>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">Roll the dice to begin</p>
        </div>
      </div>
    )
  }

  if (gameStatus === "PENDING_APPROVAL") {
    return (
      <div
        className="rounded-lg bg-white border border-gray-200 p-4 sm:p-6 h-full flex items-center justify-center shadow-sm">
        <div className="text-center space-y-2 sm:space-y-3 px-2">
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600"/>
          </div>
          <p className="font-semibold text-sm sm:text-base text-gray-900">Checkpoint Reached!</p>
          <p className="text-xs sm:text-sm text-gray-600">Go to Room {checkpoint?.roomNumber} and wait for admin
            approval</p>
          <p className="text-xs text-gray-500 mt-1">Question already assigned, will be revealed after approval</p>
        </div>
      </div>
    )
  }

  // AWAITING_QUESTION state removed - questions now auto-assigned during dice roll

  if (gameStatus === "QUESTION_ASSIGNED" && questionData) {
    const questionType = questionData.question?.type || "CODING"
    const options = questionData.question?.options || []

    return (
      <div className="rounded-lg bg-white border border-gray-200 p-6 space-y-6 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Question</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1 bg-gray-100 text-gray-900 border-gray-300">
                {getQuestionTypeIcon(questionType)}
                {getQuestionTypeLabel(questionType)}
              </Badge>
              <Badge variant="outline"
                     className="border-gray-300 text-gray-700">{questionData.question.difficulty === 1 ? "Easy" : questionData.question.difficulty === 2 ? "Medium" : questionData.question.difficulty === 3 ? "Hard" : questionData.question.difficulty}</Badge>
            </div>
          </div>

          <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">{questionData.question.text}</p>
        </div>

        {submitResult && (
          <div
            className={`p-3 sm:p-4 rounded-lg ${submitResult.isCorrect ? 'bg-green-100' : submitResult.autoMarked ? 'bg-red-100' : 'bg-blue-100'}`}>
            <div className="flex items-center gap-2">
              {submitResult.autoMarked ? (
                submitResult.isCorrect ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0"/>
                ) : (
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0"/>
                )
              ) : (
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0"/>
              )}
              <p className="text-xs sm:text-sm font-semibold text-gray-900">{submitResult.message}</p>
            </div>
          </div>
        )}

        {!submitResult && (
          <div className="space-y-4">
            {/* Options Selection (Radio Buttons for MCQ or NUMERICAL with options) */}
            {(questionType === "MCQ" || (questionType === "NUMERICAL" && options.length > 0)) && options.length > 0 && (
              <div className="space-y-3">
                <Label>Select your answer:</Label>
                <RadioGroup value={answer} onValueChange={setAnswer} className="space-y-2">
                  {options.map((option: string, index: number) => (
                    <div key={index}
                         className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-secondary/50 cursor-pointer">
                      <RadioGroupItem value={option} id={`option-${index}`}/>
                      <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* NUMERICAL Type - Number Input (when no options) */}
            {questionType === "NUMERICAL" && options.length === 0 && (
              <div>
                <Label htmlFor="answer">Your Answer (Number)</Label>
                <Input
                  id="answer"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your numerical answer..."
                  className="mt-2"
                />
              </div>
            )}

            {/* CODING Type - Code Textarea */}
            {questionType === "CODING" && (
              <div>
                <Label htmlFor="answer">Your Code</Label>
                <Textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Write your code here..."
                  className="mt-2 min-h-40 font-mono text-sm"
                />
              </div>
            )}

            {/* PHYSICAL Type - Text Description */}
            {questionType === "PHYSICAL" && (
              <div>
                <Label htmlFor="answer">Describe your completed task</Label>
                <Textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Describe how you completed the physical task..."
                  className="mt-2 min-h-32"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Note: The admin will verify your physical task completion.
                </p>
              </div>
            )}

            {/* Hint Display - Shows above buttons when revealed */}
            {showHint && questionData.question.hint && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0"/>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-amber-900 mb-1">Hint: (+60s penalty)</p>
                    <p className="text-sm text-amber-800">{questionData.question.hint}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleHintClick}
                variant="outline"
                className="flex items-center justify-center gap-2 text-sm w-full sm:w-auto bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
                disabled={usingHint || showHint}
              >
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4"/>
                {usingHint ? "Loading..." : showHint ? "Hint used" : "Show Hint (+60s)"}
              </Button>
              <Button onClick={handleSubmitAnswer} disabled={!answer.trim() || submitting}
                      className="flex-1 text-sm bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500">
                <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2"/>
                {submitting ? "Submitting..." : "Submit Answer"}
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if ((gameStatus === "SOLVING" || gameStatus === "LOCKED") && questionData) {
    const questionType = questionData.question?.type || "CODING"
    const participantAnswer = questionData.participantAnswer
    const status = questionData.status

    return (
      <div className="rounded-lg bg-white border border-gray-200 p-6 space-y-6 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Question</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1 bg-gray-100 text-gray-900 border-gray-300">
                {getQuestionTypeIcon(questionType)}
                {getQuestionTypeLabel(questionType)}
              </Badge>
              <Badge variant="outline"
                     className="border-gray-300 text-gray-700">{questionData.question.difficulty === 1 ? "Easy" : questionData.question.difficulty === 2 ? "Medium" : questionData.question.difficulty === 3 ? "Hard" : questionData.question.difficulty}</Badge>
            </div>
          </div>

          <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">{questionData.question.text}</p>
        </div>

        {participantAnswer && (
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Your submitted answer:</p>
            <p className="text-sm font-mono whitespace-pre-wrap text-gray-900">{participantAnswer}</p>
          </div>
        )}

        {participantAnswer && (
          <div className={`p-4 rounded-lg text-center border-2 ${
            status === 'CORRECT' ? 'bg-green-100 border-green-400' :
              status === 'INCORRECT' ? 'bg-red-100 border-red-400' :
                'bg-green-50 border-green-500'
          }`}>
            {status === 'CORRECT' ? (
              <>
                <CheckCircle className="w-6 h-6 mx-auto text-green-600 mb-2"/>
                <p className="text-sm font-semibold text-green-700">✓ Correct!</p>
                <p className="text-xs text-gray-800 mt-1">You can now roll the dice again.</p>
              </>
            ) : status === 'INCORRECT' ? (
              <>
                <XCircle className="w-6 h-6 mx-auto text-red-600 mb-2"/>
                <p className="text-sm font-semibold text-red-700">✗ Incorrect</p>
                <p className="text-xs text-gray-800 mt-1">Waiting for admin review...</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-gray-900">✓ Answer Submitted</p>
                <p className="text-xs text-gray-900 mt-1">Waiting for admin to evaluate your answer...</p>
              </>
            )}
          </div>
        )}
      </div>
    )
  }

  return null
}
