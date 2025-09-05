"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Circle, PlayCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createClient } from "../lib/supabase/client"
import { CourseModule, Enrollment } from "../lib/types"

interface ModuleNavigationProps {
  modules: CourseModule[]
  currentModuleId?: string
  courseId: string
  enrollment: Enrollment
}

export function ModuleNavigation({ modules, currentModuleId, courseId, enrollment }: ModuleNavigationProps) {
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())

  const handleMarkComplete = async (moduleId: string) => {
    const supabase = createClient()

    // Add to completed modules
    const newCompleted = new Set(completedModules)
    newCompleted.add(moduleId)
    setCompletedModules(newCompleted)

    // Calculate new progress
    const newProgress = Math.round((newCompleted.size / modules.length) * 100)

    // Update enrollment progress
    await supabase.from("enrollments").update({ progress: newProgress }).eq("id", enrollment.id)
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-4">Course Modules</h3>
      {modules.map((module) => {
        const isCompleted = completedModules.has(module.id)
        const isCurrent = module.id === currentModuleId

        return (
          <Card key={module.id} className={`transition-colors ${isCurrent ? "ring-2 ring-primary" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : isCurrent ? (
                    <PlayCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Module {module.order_index}</span>
                  </div>
                  <h4 className="font-medium text-sm line-clamp-2 mb-2">{module.title}</h4>
                  <div className="flex gap-2">
                    <Button variant={isCurrent ? "default" : "ghost"} size="sm" className="h-8 text-xs" asChild>
                      <Link href={`/school/dashboard/courses/${courseId}?module=${module.id}`}>
                        {isCurrent ? "Continue" : "View"}
                      </Link>
                    </Button>
                    {isCurrent && !isCompleted && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs bg-transparent"
                        onClick={() => handleMarkComplete(module.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
