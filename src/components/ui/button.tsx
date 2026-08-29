import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-paper hover:bg-ink/85 active:scale-[0.98]",
        inverse:
          "bg-paper text-ink hover:bg-paper/85 active:scale-[0.98]",
        outline:
          "border border-ink/70 text-ink bg-transparent hover:border-ink hover:bg-ink hover:text-paper",
        "outline-light":
          "border border-paper/60 text-paper bg-transparent hover:border-paper hover:bg-paper hover:text-ink",
        ghost: "text-ink hover:text-accent",
        link: "text-ink underline-offset-4 hover:underline p-0 h-auto normal-case tracking-normal text-sm",
        accent: "bg-accent text-ink hover:bg-accent/85 active:scale-[0.98]",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-[10px]",
        lg: "h-14 px-10 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
