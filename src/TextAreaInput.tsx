import { LabelHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  label: string
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
  error?: FieldError
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const TextAreaInput = forwardRef<HTMLTextAreaElement, Props>((props: Props, ref) => {
  const { label, error, labelProps, ...rest } = props

  return (
    <div className='mb-3'>
      <label {...labelProps} htmlFor={rest.id}>
        {label}
      </label>
      <textarea {...rest} ref={ref} />
      {error && <span className='text-xs text-red-400'>{error.message}</span>}
    </div>
  )
})

TextAreaInput.displayName = 'TextAreaInput'

export default TextAreaInput
