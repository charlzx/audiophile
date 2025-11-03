import { twMerge } from "tailwind-merge"

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean
  form?: string
}

export function SubmitButton({ children, className, fullWidth, ...props }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={twMerge(
        "bg-orange px-8 py-4 text-sm font-bold uppercase tracking-[0.0625rem] text-neutral-100 transition-colors hover:bg-orange-light",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
} 