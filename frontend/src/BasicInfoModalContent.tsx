import { yupResolver } from '@hookform/resolvers/yup'
import { differenceInYears } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Info } from './BasicInfo'
import TextInput from './TextInput'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type Props = { showModal?: boolean; info: Info }

const validationSchema = yup.object().shape({
  firstName: yup.string().trim().required('First name is a required field'),
  lastName: yup.string().trim().required('Last name is a required field'),
  dob: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .test('is-in-past', 'Date of birth should be atleast 1 year in the past', (value, context) => {
      if (value) {
        const age = differenceInYears(new Date(), value)
        return age > 1 ? true : false
      }
      return context.createError({ message: 'Date of birth is a required field' })
    })
    .required('Date of birth is a required field'),
})

const BasicInfoModalContent = (props: Props) => {
  const { showModal, info } = props

  const defaultValues = {
    firstName: info?.firstName || '',
    lastName: info?.lastName || '',
    dob: info?.dob || '',
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const navigate = useNavigate()

  const [files, setFiles] = useState<{ file: File; preview: string }[]>([])
  const [fileError, setFileError] = useState<string>('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file: File) =>
        Object.assign(
          { file },
          {
            preview: URL.createObjectURL(file),
          },
        ),
      ),
    )
  }, [])

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpeg', '.png'] },
    maxFiles: 1,
    maxSize: 200000,
    multiple: false,
  })

  const onSubmit = async (data: typeof defaultValues) => {
    console.log(data)
    const imageFile = files[0]
    if (imageFile.file) {
      const formData = new FormData()

      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('title', 'Software Engineer')
      formData.append('dob', data.dob)
      formData.append('image', imageFile.file)
      try {
        const { data } = await axios.post('http://localhost:8000/api/profile', formData)
        navigate(`/${data.id}/profile`, { replace: true })
      } catch (error) {
        console.log('something went wrong')
      }
    } else {
      setFileError('Profile image is a required field')
    }
  }

  useEffect(() => {
    showModal === false && reset()
  }, [showModal])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-row'>
        <div className='flex basis-1/6 flex-col'>
          <div {...getRootProps({ className: 'w-[150px] h-[150px]' })}>
            {files.length > 0 && (
              <img
                alt='profile'
                src={files[0].preview}
                onLoad={() => {
                  URL.revokeObjectURL(files[0].preview)
                }}
                className='border-2 w-[150px] mt-3'
              />
            )}
            <input {...getInputProps()} />
            <p className='text-center h-1/2 text-sm p-2 border'>
              Drag drop company logo here, or click to select files
            </p>
          </div>
          <span className='text-xs mt-1 text-red-400'>{fileError}</span>
          {fileRejections.map(
            ({ errors }) =>
              errors && (
                <>
                  {errors.map((error) => (
                    <span key={error.code} className='text-xs mt-1 text-red-400'>
                      {error.code === 'file-too-large' ? 'File is larger than 2MB' : error.message}
                    </span>
                  ))}
                </>
              ),
          )}
        </div>
        <div className='flex flex-col basis-5/6 ml-12'>
          <TextInput
            {...register('firstName')}
            labelProps={{ className: 'text-sm' }}
            label='First name'
            className='border rounded w-full'
            error={errors.firstName}
          />
          <TextInput
            {...register('lastName')}
            labelProps={{ className: 'text-sm' }}
            label='Last name'
            className='border rounded w-full'
            error={errors.lastName}
          />
          <TextInput
            {...register('dob')}
            labelProps={{ className: 'text-sm' }}
            label='Date of birth'
            type='date'
            className='border rounded w-full'
            error={errors.dob}
          />
        </div>
      </div>
      <div className='mt-auto text-right'>
        <button
          className='mt-4 border border-blue-900 bg-blue-800 text-white hover:bg-white hover:border-inherit hover:text-black font-semibold rounded-sm px-4 py-1'
          type='submit'
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default BasicInfoModalContent
