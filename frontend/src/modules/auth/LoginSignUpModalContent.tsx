import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import * as yup from 'yup'
import TextInput from '../../shared/components/TextInput'
import AuthContext from 'context/authContext'

export type FileWithPreview = { file: File; preview: string }
export type LoginFormValues = { email: string; password: string }
export type SignUpFormValues = { email: string; password: string; confirmPassword: string }

type Props = {
  show: boolean
  type: 'login' | 'signup'
  onRequestClose: (refetch?: boolean) => void
  onSwitchType: (type: 'login' | 'signup') => void
}

const loginValidationSchema = yup.object().shape({
  email: yup.string().trim().email().required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(8, 'Password needs to be 8 characters minimum')
    .required('Password is required'),
})

const signUpValidationSchema = loginValidationSchema.concat(
  yup.object().shape({
    confirmPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  }),
)

const LoginSignUpModalContent = (props: Props) => {
  const { signin, register: signUp } = useContext(AuthContext)
  const { show, onRequestClose, onSwitchType, type } = props

  const defaultValuesLogin: LoginFormValues = {
    email: '',
    password: '',
  }
  const defaultValuesSignUp: SignUpFormValues = {
    ...defaultValuesLogin,
    confirmPassword: '',
  }

  const isLogin = type === 'login'
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues | SignUpFormValues>({
    mode: 'all',
    defaultValues: isLogin ? defaultValuesLogin : defaultValuesSignUp,
    resolver: yupResolver(isLogin ? loginValidationSchema : signUpValidationSchema),
  })

  const onSubmit = async (formValues: LoginFormValues | SignUpFormValues) => {
    const body = {
      email: formValues.email,
      password: formValues.password,
    }

    const authApiCall = isLogin ? signin : signUp
    await authApiCall(body, ({ isOk, data, error }) => {
      console.log('data', data)
      if (isOk) onRequestClose(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setError('root.serverError', {
        message: error,
      })
    })
  }

  useEffect(() => {
    reset()
  }, [type])

  useEffect(() => {
    show === false && reset()
  }, [show])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const serverError = errors?.root?.serverError

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
      <div className='flex flex-row mt-2'>
        <div className='flex flex-col basis-5/6 ml-12'>
          <TextInput
            {...register('email')}
            labelProps={{ className: 'text-sm' }}
            label='Email'
            type='email'
            autoComplete='username'
            className='border rounded w-full'
            error={errors.email}
          />
          <TextInput
            {...register('password')}
            labelProps={{ className: 'text-sm' }}
            label='Password'
            type='password'
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            className='border rounded w-full'
            error={errors.password}
          />
          {!isLogin && (
            <TextInput
              {...register('confirmPassword')}
              labelProps={{ className: 'text-sm' }}
              label='Confirm Password'
              type='password'
              autoComplete='new-password'
              className='border rounded w-full'
              error={(errors as FieldErrors<SignUpFormValues>).confirmPassword}
            />
          )}
          {serverError && (
            <div className='border border-red-500 bg-red-100 text-red-500 px-2 py-1 rounded mt-2 mb-2'>
              {serverError.message}
            </div>
          )}
        </div>
      </div>
      <div className='mt-auto justify-end flex px-12 mb-4'>
        {isLogin && (
          <button
            onClick={() => onSwitchType('signup')}
            className='mt-4 px-0 mr-auto text-black hover:bg-white hover:border-inherit hover:text-blue-800 hover:underline font-semibold rounded-sm py-1'
            type='button'
          >
            Create Account
          </button>
        )}
        <button
          aria-label={isLogin ? 'Login' : 'Sign Up'}
          className='mt-4 border border-blue-900 bg-blue-800 text-white hover:bg-blue-900 hover:border-inherit hover:text-white font-semibold rounded-sm px-4 py-1'
          type='submit'
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </div>
    </form>
  )
}

export default LoginSignUpModalContent
