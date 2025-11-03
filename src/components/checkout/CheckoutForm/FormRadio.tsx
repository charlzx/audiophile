import { forwardRef } from 'react'

interface FormRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const FormRadio = forwardRef<HTMLInputElement, FormRadioProps>(
  ({ label, ...props }, ref) => {
    return (
      <label className="group flex cursor-pointer items-center gap-4 rounded-lg border border-form-border px-6 py-[1.125rem] hover:border-orange [&:has(input:checked)]:border-orange">
        <input
          type="radio"
          ref={ref}
          className="h-5 w-5 accent-orange"
          {...props}
        />
        <span className="text-sm font-bold tracking-[-0.016em]">{label}</span>
      </label>
    )
  }
)

FormRadio.displayName = 'FormRadio' 