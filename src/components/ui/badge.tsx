import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center text-nowrap rounded-full border border-slate-200 px-2.5 py-0.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-accent-primary text-slate-50 hover:bg-accent-primary-dark",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80",
        destructive:
          "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80",
        outline: "text-slate-950",
        pending:
          "border-transparent bg-warning text-warning-dark hover:bg-warning/80",
        ready:
          "border-transparent bg-positive text-positive-dark hover:bg-positive/80",
        cancelled:
          "border-transparent bg-negative text-negative-dark hover:bg-negative/80",
        onhold:
          "border-transparent bg-slate-200/80 text-slate-900 hover:bg-slate-200/60",
        draft:
          "border-transparent bg-slate-200/80 text-slate-900 hover:bg-slate-200/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
