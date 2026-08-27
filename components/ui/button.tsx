import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold touch-manipulation transition-[transform,opacity,background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-[#0E625B] text-[#F8F4E8] border-b-4 border-[#073B3A] hover:bg-[#073B3A] focus-visible:outline-[#C89B3C]",
        gold:
          "bg-[#C89B3C] text-[#172525] border-b-4 border-[#A67B2A] hover:bg-[#E5C77B] focus-visible:outline-[#073B3A]",
        outline:
          "border-2 border-[#0E625B] bg-transparent text-[#073B3A] hover:bg-[#F8F4E8] focus-visible:outline-[#C89B3C]",
        ghost:
          "bg-transparent text-[#073B3A] hover:bg-[#DCCBA7]/40 focus-visible:outline-[#C89B3C]",
      },
      size: {
        sm: "min-h-10 px-4 py-2 text-sm",
        md: "min-h-12 px-5 py-2.5 text-base",
        lg: "min-h-14 px-6 py-3 text-lg",
        xl: "min-h-16 px-8 py-4 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

export { buttonVariants };
