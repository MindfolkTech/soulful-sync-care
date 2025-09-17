import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-[--space-sm]", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-[--space-sm] sm:space-x-[--space-sm] sm:space-y-0",
        month: "space-y-[--space-sm]",
        caption: "flex justify-center pt-[--space-xs] relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-[--space-xs] flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-[--touch-target-min] w-[--touch-target-min] bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-[--space-xs]",
        nav_button_next: "absolute right-[--space-xs]",
        table: "w-full border-collapse space-y-[--space-xs]",
        head_row: "flex",
        head_cell:
          "text-[hsl(var(--text-muted))] rounded-md w-[--touch-target-comfort] font-normal text-[0.8rem]",
        row: "flex w-full mt-[--space-xs]",
        cell: "h-[--touch-target-comfort] w-full text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[hsl(var(--surface-accent))] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-[--touch-target-comfort] w-[--touch-target-comfort] font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-[hsl(var(--garden-green))] text-[hsl(var(--text-on-brand))] hover:bg-[hsl(var(--garden-green))] hover:text-[hsl(var(--text-on-brand))] focus:bg-[hsl(var(--garden-green))] focus:text-[hsl(var(--text-on-brand))]",
        day_today: "bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-primary))]",
        day_outside:
          "text-[hsl(var(--text-muted))] opacity-50 aria-selected:bg-[hsl(var(--surface-accent))]/50 aria-selected:text-[hsl(var(--text-muted))] aria-selected:opacity-30",
        day_disabled: "text-[hsl(var(--text-muted))] opacity-50",
        day_range_middle:
          "aria-selected:bg-[hsl(var(--surface-accent))] aria-selected:text-[hsl(var(--text-primary))]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-[--space-sm] w-[--space-sm]" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-[--space-sm] w-[--space-sm]" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }