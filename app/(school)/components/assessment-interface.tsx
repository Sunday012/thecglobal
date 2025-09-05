"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, Clock } from "lucide-react"
import { createClient } from "../lib/supabase/client"
import { Assessment, AssessmentQuestion } from "../lib/types"

interface AssessmentInterfaceProps {
  assessment: Assessment
  courseId: string
  enrollmentId: string
}

export function AssessmentInterface({ assessment, courseId, enrollmentId }: AssessmentInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    assessment.time_limit_minutes ? assessment.time_limit_minutes * 60 : null,
  )
  const [hasStarted, setHasStarted] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const router = useRouter()

  const currentQuestion = assessment.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100
  const answeredQuestions = Object.keys(answers).length
  const totalQuestions = assessment.questions.length

  // Timer effect
  useEffect(() => {
    if (!hasStarted || timeRemaining === null) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          handleSubmit()
          return 0
        }
        if (prev <= 300 && prev % 60 === 0) {
          // Show warning at 5 minutes and every minute after
          setShowWarning(true)
          setTimeout(() => setShowWarning(false), 3000)
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [hasStarted, timeRemaining])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: number, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleSubmit = async () => {
    const supabase = createClient()
    setIsSubmitting(true)

    try {
      // Calculate score for multiple choice questions
      let correctAnswers = 0
      let totalScorable = 0

      assessment.questions.forEach((question: AssessmentQuestion) => {
        if (question.type === "multiple_choice" && question.correct_answer !== undefined) {
          totalScorable++
          if (answers[question.id] === question.correct_answer) {
            correctAnswers++
          }
        }
      })

      const score = totalScorable > 0 ? Math.round((correctAnswers / totalScorable) * 100) : 0
      const passed = score >= assessment.passing_score

      // Save assessment attempt
      const { error: attemptError } = await supabase.from("assessment_attempts").insert({
        assessment_id: assessment.id,
        student_id: (await supabase.auth.getUser()).data.user?.id,
        answers,
        score,
        passed,
        completed_at: new Date().toISOString(),
      })

      if (attemptError) throw attemptError

      // If passed, mark course as completed
      if (passed) {
        await supabase
          .from("enrollments")
          .update({
            status: "completed",
            completion_date: new Date().toISOString(),
            progress: 100,
          })
          .eq("id", enrollmentId)
      }

      // Refresh the page to show results
      router.refresh()
    } catch (error) {
      console.error("Error submitting assessment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isAnswered = (questionId: number) => {
    return answers[questionId] !== undefined && answers[questionId] !== ""
  }

  if (!hasStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ready to Begin?</CardTitle>
          <CardDescription>
            Once you start the assessment, you cannot pause or restart it. Make sure you have enough time to complete
            it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This assessment contains {assessment.questions.length} questions
              {assessment.time_limit_minutes && ` and has a ${assessment.time_limit_minutes} minute time limit`}. You
              need {assessment.passing_score}% to pass.
            </AlertDescription>
          </Alert>
          <Button onClick={() => setHasStarted(true)} className="w-full">
            Start Assessment
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Time Warning */}
      {showWarning && timeRemaining && timeRemaining <= 300 && (
        <Alert className="border-orange-200 bg-orange-50">
          <Clock className="h-4 w-4" />
          <AlertDescription>Warning: Only {formatTime(timeRemaining)} remaining!</AlertDescription>
        </Alert>
      )}

      {/* Progress and Timer */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {assessment.questions.length}
              </span>
              <span className="text-sm text-muted-foreground">
                Answered: {answeredQuestions}/{totalQuestions}
              </span>
            </div>
            {timeRemaining !== null && (
              <span className={`text-sm font-medium ${timeRemaining <= 300 ? "text-orange-600" : ""}`}>
                Time: {formatTime(timeRemaining)}
              </span>
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium ${
                isAnswered(currentQuestion.id) ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
              }`}
            >
              {currentQuestionIndex + 1}
            </span>
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.type === "multiple_choice" && currentQuestion.options && (
            <RadioGroup
              value={answers[currentQuestion.id]?.toString() || ""}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, Number.parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === "essay" && (
            <div className="space-y-2">
              <Textarea
                placeholder="Enter your answer here..."
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                rows={6}
              />
              {currentQuestion.min_words && (
                <p className="text-xs text-muted-foreground">Minimum {currentQuestion.min_words} words required</p>
              )}
            </div>
          )}

          {currentQuestion.type === "true_false" && (
            <RadioGroup
              value={answers[currentQuestion.id]?.toString() || ""}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value === "true")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true" className="cursor-pointer">
                  True
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false" className="cursor-pointer">
                  False
                </Label>
              </div>
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      {/* Question Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {assessment.questions.map((_, index) => (
              <Button
                key={index}
                variant={
                  index === currentQuestionIndex
                    ? "default"
                    : isAnswered(assessment.questions[index].id)
                      ? "secondary"
                      : "outline"
                }
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <div className="flex gap-2">
          {currentQuestionIndex < assessment.questions.length - 1 ? (
            <Button onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Assessment"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
