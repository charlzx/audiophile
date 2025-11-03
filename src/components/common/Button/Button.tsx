import { cva, VariantProps } from "cva";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, FC, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonHTMLProps = Omit<HTMLAttributes<HTMLButtonElement>, "type">;
type AnchorHTMLProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
type ButtonProps = VariantProps<typeof buttonVariants> & {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
} & (ButtonHTMLProps | AnchorHTMLProps);

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
  ...restProps
}) => {
  const buttonClasses = twMerge(
    buttonVariants({ intent, fullWidth, disabled }),
    className,
  );

  if (href) {
    return (
      <Link
        {...(restProps as LinkProps)}
        onClick={onClick}
        className={buttonClasses}
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...(restProps as ButtonHTMLProps)}
      type="button"
      onClick={onClick}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
