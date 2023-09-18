import { InputHTMLAttributes, LabelHTMLAttributes, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  label: string
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
  error?: FieldError
} & InputHTMLAttributes<HTMLInputElement>

const TextInput = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { label, error, labelProps, ...rest } = props
  const className = `${rest.className || ''} py-1 px-2`
  return (
    <div className='mb-3'>
      <label {...labelProps} htmlFor={rest.id}>
        {label}
      </label>
      <input {...rest} ref={ref} className={className} />
      {error && <span className='text-xs text-red-400'>{error.message}</span>}
    </div>
  )
})

TextInput.displayName = 'TextInput'

export default TextInput
