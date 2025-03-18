import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@repo/design-system/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
          destructiveOutline:
          "border-background bg-background/15 text-destructive-foreground hover:bg-destructive/80",
    
        muted: "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
      },
      outlineColor: {
        default: "",

        orange:
          "border-orange-500 bg-orange-100/25 text-orange-700 dark:bg-orange-900 dark:text-orange-100",
        cyan: "border-cyan-500 bg-cyan-100/25 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100",
        blue: "border-blue-500 bg-blue-100/25 text-blue-700 dark:bg-blue-900 dark:text-blue-100",
        red: "border-red-500 bg-red-100/25 text-red-700 dark:bg-red-900 dark:text-red-100",
        green:
          "border-green-500 bg-green-100/25 text-green-700 dark:bg-green-900 dark:text-green-100",
        slate:
          "border-slate-500 bg-slate-100/25 text-slate-700 dark:bg-slate-900 dark:text-slate-100",
        purple:
          "border-purple-500 bg-purple-100/25 text-purple-700 dark:bg-purple-900 dark:text-purple-100",
        pink: "border-pink-500 bg-pink-100/25 text-pink-700 dark:bg-pink-900 dark:text-pink-100",
        yellow:
          "border-yellow-500 bg-yellow-100/25 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100",
        indigo:
          "border-indigo-500 bg-indigo-100/25 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100",
        teal: "border-teal-500 bg-teal-100/25 text-teal-700 dark:bg-teal-900 dark:text-teal-100",
        violet:
          "border-violet-500 bg-violet-100/25 text-violet-700 dark:bg-violet-900 dark:text-violet-100",
      },
    },
    defaultVariants: {
      variant: "default",
      outlineColor: 'default'
    },
  }
)

function Badge({
  className,
  variant,
  outlineColor,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, outlineColor }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
