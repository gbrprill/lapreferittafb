import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-bold uppercase cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow transition-colors duration-200 hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm transition-colors duration-200 hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm transition-colors duration-200 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm transition-colors duration-200 hover:bg-secondary/80",
        ghost: "transition-colors duration-200 hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 transition-colors duration-200 hover:underline",
        // Solid CTA: a liquid fill rises and deepens the tone on hover, paired with a soft
        // brand-colored shadow bloom and a gentle lift. There is no background-color
        // keyframe, so there is never a mismatched-hue flash mid-transition.
        brand:
          "btn-liquid text-primary-foreground shadow-brand hover:-translate-y-0.5 hover:shadow-brand-strong [--btn-liquid-bg:var(--primary)] [--btn-liquid-fill:var(--primary-dark)]",
        inverse:
          "btn-liquid text-brand-charcoal hover:-translate-y-0.5 hover:text-primary-foreground [--btn-liquid-bg:var(--brand-ivory)] [--btn-liquid-fill:var(--brand-orange)]",
        outlineInverse:
          "btn-liquid border border-brand-ivory/60 text-brand-ivory hover:-translate-y-0.5 hover:border-brand-orange hover:text-primary-foreground [--btn-liquid-bg:transparent] [--btn-liquid-fill:var(--brand-orange)]",
        iconInverse:
          "btn-liquid border border-brand-ivory/40 text-brand-ivory hover:border-brand-orange hover:text-primary-foreground [--btn-liquid-bg:var(--brand-charcoal)] [--btn-liquid-fill:var(--brand-orange)]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        xl: "h-12 px-6 md:h-14 md:px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
