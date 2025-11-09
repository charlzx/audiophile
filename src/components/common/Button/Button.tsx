import { cva, VariantProps } from "cva";
import Link, { LinkProps } from "next/link";
import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

type ButtonProps = VariantProps<typeof buttonVariants> & {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

const buttonVariants = cva(
  [
    "[--padding-x:1.9rem]",
    "[--padding-y:0.72rem]",
    "inline-block",
    "cursor-pointer",
    "select-none",
    "whitespace-nowrap",
    "px-[--padding-x]",
    "py-[--padding-y]",
    "text-center",
    "text-xs",
    "uppercase",
    "tracking-[0.0625rem]",
    "transition",
    "duration-300",
    "ease-in-out",
  ],
  {
    variants: {
      intent: {
        primary: ["text-neutral-100", "bg-orange", "hover:bg-orange-light"],
        secondary: [
          "border",
          "border-neutral-900",
          "bg-transparent",
          "px-[calc(1.9rem-1px)]",
          "py-[calc(0.94rem-1px)]",
          "hover:bg-neutral-900",
          "hover:text-neutral-100",
        ],
        "secondary-alt": [
          "text-neutral-100",
          "bg-neutral-900",
          "hover:bg-neutral-600",
        ],
        simple: [
          "[--padding-x:0.1rem]",
          "[--padding-y:0.1rem]",
          "inline-flex",
          "items-center",
          "justify-center",
          "gap-[0.83rem]",
          "text-neutral-900/50",
          "hover:text-orange",
          "[&>img]:h-3",
          "[&>img]:w-auto",
        ],
      },
      fullWidth: {
        true: "w-full",
      },
      disabled: {
        true: ["opacity-50", "cursor-not-allowed"],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

const Button: FC<ButtonProps> = ({
  href,
  children,
  intent,
  fullWidth,
  disabled,
  onClick,
  className,
}) => {
  const buttonClasses = twMerge(
    buttonVariants({ intent, fullWidth, disabled }),
    className,
  );

  const motionChildClasses = twMerge(
    intent === "simple"
      ? "inline-flex items-center justify-center gap-[0.83rem]"
      : "inline-block",
  );

  if (href) {
    return (
      <Link
        onClick={onClick}
        className={buttonClasses}
        href={href}
      >
        <motion.span
          className={motionChildClasses}
          whileHover={!disabled ? { scale: 1.02 } : undefined}
          whileTap={!disabled ? { scale: 0.98 } : undefined}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={buttonClasses}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
      disabled={disabled || undefined}
    >
      {children}
    </motion.button>
  );
};

export default Button;
