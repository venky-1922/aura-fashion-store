import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] leading-none",
  {
    variants: {
      variant: {
        new: "bg-ink text-paper",
        sale: "bg-accent text-ink",
        bestseller: "bg-paper text-ink border border-ink/70",
        outline: "border border-current",
      },
    },
    defaultVariants: { variant: "new" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
