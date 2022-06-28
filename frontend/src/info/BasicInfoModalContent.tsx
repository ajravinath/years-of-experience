import { yupResolver } from '@hookform/resolvers/yup'
import { differenceInYears } from 'date-fns'
import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Info, OfflineInfo } from './BasicInfo'
import TextInput from '../shared/TextInput'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/appContext'
import PutRequest from '../models/PutRequest'
import PostRequest from '../models/PostRequest'
import { v4 as uuid } from 'uuid'

export type FileWithPreview = { file: File; preview: string }
export type FormValues = { firstName: string; lastName: string; title: string; dob: string }

type Props = {
  info?: Info
  show: boolean
  onRequestClose: (refetch?: boolean) => void
  setInfoOffline: (info: OfflineInfo, file: FileWithPreview) => void
}

const validationSchema = yup.object().shape({
  firstName: yup.string().trim().required('First name is a required field'),
  lastName: yup.string().trim().required('Last name is a required field'),
  title: yup.string().trim(),
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
  const { show, onRequestClose, setInfoOffline, info } = props

  const defaultValues: FormValues = {
    firstName: info?.firstName || '',
    lastName: info?.lastName || '',
    title: info?.title || '',
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
  const { addRequest } = useContext(AppContext)

  const [files, setFiles] = useState<FileWithPreview[]>([])
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
    const imageFile = files[0]

    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      title: data.title,
      dob: data.dob,
    }

    const formData = new FormData()
    if (info) {
      formData.append('data', JSON.stringify(body))
      console.log('info.id: ', info.id)
      if (imageFile?.file) {
        formData.append('image', imageFile.file)
      } else if (!info.image) {
        setFileError('Profile image is a required field')
      }

      const url = `${process.env.REACT_APP_BASE_URL}api/profile/${info.id}`
      try {
        const { data } = await axios.put(url, formData)
        navigate(`/${data.id}/profile`, { replace: true })
        onRequestClose(true)
      } catch (error: unknown) {
        const error_ = error as AxiosError
        if (error_.name === 'AxiosError' && error_.code === 'ERR_NETWORK') {
          addRequest(new PutRequest(url, formData))
          setInfoOffline({ ...info, ...data }, imageFile)
          navigate(`/${info.id}/profile`, { replace: true })
          onRequestClose(true)
        }
        console.log('something went wrong', error)
      }
    } else {
      const newId = uuid()
      formData.append('data', JSON.stringify(Object.assign(body, { id: newId })))
      if (imageFile?.file) {
        formData.append('image', imageFile.file)

        const url = `${process.env.REACT_APP_BASE_URL}api/profile`
        try {
          const { data } = await axios.post(url, formData)
          navigate(`/${data.id}/profile`, { replace: true })
          onRequestClose(true)
        } catch (error: unknown) {
          const error_ = error as AxiosError
          if (error_.name === 'AxiosError' && error_.code === 'ERR_NETWORK') {
            addRequest(new PostRequest(url, formData))
            setInfoOffline({ ...data, id: newId }, imageFile)
            navigate(`/${newId}/profile`, { replace: true })
            onRequestClose(true)
          }
          console.log('something went wrong', error)
        }
      } else {
        setFileError('Profile image is a required field')
      }
    }
  }

  useEffect(() => {
    show === false && reset()
  }, [show])

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
      <div className='flex flex-row'>
        <div className='flex basis-1/6 flex-col'>
          <div {...getRootProps({ className: 'w-[150px] h-[150px]' })}>
            {files.length > 0 ? (
              <img
                alt='profile'
                src={files[0].preview}
                onLoad={() => {
                  URL.revokeObjectURL(files[0].preview)
                }}
                className='border-2 w-[150px] mt-3'
              />
            ) : (
              <>
                {info && (
                  <img
                    alt='profile'
                    src={`${process.env.REACT_APP_BASE_URL}${info.image}`}
                    className='border-2 w-[150px] mt-3'
                  />
                )}
              </>
            )}
            <input {...getInputProps()} />
            <p className='text-center h-1/2 text-sm p-2 border'>
              Drag drop company logo here, or click to select files
            </p>
            <span className='text-xs mt-1 text-red-400'>{fileError}</span>
            {fileRejections.map(
              ({ errors }, idx) =>
                errors && (
                  <Fragment key={idx}>
                    {errors.map((error) => (
                      <span key={error.code} className='text-xs mt-1 text-red-400'>
                        {error.code === 'file-too-large'
                          ? 'File is larger than 2MB'
                          : error.message}
                      </span>
                    ))}
                  </Fragment>
                ),
            )}
          </div>
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
          <TextInput
            {...register('title')}
            labelProps={{ className: 'text-sm' }}
            label='Title'
            className='border rounded w-full'
            error={errors.title}
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
