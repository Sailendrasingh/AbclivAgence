import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.memo(
  React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, suppressHydrationWarning, ...props }, ref) => {
      // Mémoriser le className calculé pour éviter les recalculs
      const inputClassName = React.useMemo(
        () =>
          cn(
            "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-base sm:text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          ),
        [className]
      )

      return (
        <input
          type={type}
          className={inputClassName}
          ref={ref}
          suppressHydrationWarning={suppressHydrationWarning}
          {...props}
        />
      )
    }
  )
)
Input.displayName = "Input"

export { Input }

