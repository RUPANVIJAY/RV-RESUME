import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, ...props }, ref) => {
    // Generate hatched pattern for the progress
    const numHatchMarks = Math.floor(value / 2) // Assuming each hatch + gap is roughly 2%

    return (
      <div
        ref={ref}
        className={cn("h-6 w-full border border-foreground p-[2px]", className)}
        {...props}
      >
        <div className="flex h-full w-full items-center overflow-hidden">
          {Array.from({ length: numHatchMarks }).map((_, i) => (
            <div
              key={i}
              className="h-full w-[2px] bg-foreground mx-[1px]"
            />
          ))}
        </div>
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }
