import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg": variant === "default",
            "bg-lavender text-primary-deep hover:bg-violet-100": variant === "secondary",
            "border border-violet-100 bg-white text-primary-deep hover:bg-lavender": variant === "outline",
            "text-primary-deep hover:bg-lavender": variant === "ghost",
            "gradient-purple text-white shadow-lg hover:opacity-90": variant === "gradient",
          },
          {
            "h-10 px-5 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-8 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
