import * as React from "react"
import { cn } from "@/lib/utils"

const Timeline = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative ml-4 md:ml-0", className)} {...props}>
    {/* Vertical dashed line */}
    <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-foreground md:-translate-x-1/2" />
    <div className="space-y-12">{props.children}</div>
  </div>
))
Timeline.displayName = "Timeline"

const TimelineItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    date: string; 
    align?: 'left' | 'right' 
  }
>(({ className, date, align = 'right', ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative flex md:justify-between items-center w-full", className)} {...props}>
      {/* Date for desktop left side */}
      <div className={cn("hidden md:block w-5/12", align === 'left' ? 'order-1 text-right pr-8' : 'order-1 text-right pr-8')}>
        {align === 'right' && (
          <span className="text-annotation text-foreground bg-background px-2">{date}</span>
        )}
      </div>

      {/* Diamond Marker */}
      <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rotate-45 transform -translate-x-1/2 md:-translate-x-1/2 z-10 outline outline-4 outline-background" />

      {/* Content */}
      <div className={cn("ml-8 md:ml-0 md:w-5/12", align === 'left' ? 'order-2 pl-8' : 'order-2 pl-8')}>
        {/* Date for mobile (always left-aligned) and desktop right side */}
        <div className="mb-2">
          <span className={cn("text-annotation text-foreground bg-background px-2", align === 'right' ? 'md:hidden' : '')}>{date}</span>
        </div>
        {props.children}
      </div>
    </div>
  )
})
TimelineItem.displayName = "TimelineItem"

export { Timeline, TimelineItem }
