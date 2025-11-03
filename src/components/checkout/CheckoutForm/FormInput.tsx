import { forwardRef } from 'react'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={className}>
        <div className="flex justify-between">
          <label 
            className={`text-[0.75rem] font-bold leading-normal tracking-[-0.016em] ${
              error ? 'text-form-error' : 'text-neutral-900'
            }`}
            htmlFor={props.name}
          >
            {label}
          </label>
          {error && (
            <span className="text-[0.75rem] font-bold leading-normal tracking-[-0.016em] text-form-error">
              {error}
            </span>
          )}
        </div>
        <input
          ref={ref}
          className={`mt-[9px] w-full rounded-lg border px-6 py-[1.125rem] text-sm font-bold tracking-[-0.016em] text-neutral-900 outline-none caret-orange placeholder:text-sm placeholder:font-bold placeholder:tracking-[-0.016em] placeholder:text-neutral-900/40 focus:border-orange ${
            error ? 'border-form-error' : 'border-form-border'
          }`}
          {...props}
        />
      </div>
    )
  }
)

FormInput.displayName = 'FormInput' 