import { yupResolver } from '@hookform/resolvers/yup'
import { isDate } from 'date-fns'
import { Fragment, useCallback, useEffect, useState, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import AppContext from '../../context/appContext'
import { ExperienceItem, ExperienceItemOffline } from './ExperienceSection'
import TextAreaInput from '../../shared/components/TextAreaInput'
import TextInput from '../../shared/components/TextInput'
import { v4 as uuid } from 'uuid'
import { FileWithPreview } from '../info/BasicInfoModalContent'
import { ExperienceApi, createExperience, editExperience } from '../../shared/api'

type Props = {
  experience?: ExperienceItem
  show: boolean
  onRequestClose: (refetch?: boolean) => void
  onChangeOffline: (experience: ExperienceItemOffline, file: FileWithPreview) => void
}

const validationSchema = yup.object().shape({
  title: yup.string().trim().required('Title is a required field'),
  company: yup.string().trim().required('Company is a required field'),
  currentlyWorking: yup.bool(),
  startDate: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required('Start date is a required field'),
  endDate: yup
    .string()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore // issue with type declarations
    .when(['currentlyWorking', 'startDate'], function (cw, sd) {
      return !cw && sd
        ? yup
            .date()
            .nullable()
            .transform((curr, orig) => (orig === '' ? null : curr))
            .required('End date is a required field')
            .min(sd, 'End date can’t be earlier than start date')
        : yup.string().notRequired()
    }),
})

const ExperienceModalContent = (props: Props) => {
  const { show, onRequestClose, experience, onChangeOffline } = props
  const defaultValues = {
    title: experience?.title || '',
    company: experience?.company || '',
    currentlyWorking: experience?.currentlyWorking || false,
    startDate: experience?.startDate || '',
    endDate: experience?.endDate || '',
    description: experience?.description || '',
  }

  const [files, setFiles] = useState<{ file: File; preview: string }[]>([])
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const { id } = useParams()
  const { addRequest } = useContext(AppContext)

  const currentlyWorking = watch('currentlyWorking')

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

  useEffect(() => {
    show === false && reset()
  }, [show])

  const onSubmit = async (data: typeof defaultValues) => {
    const imageFile = files?.[0]

    const body = {
      title: data.title,
      company: data.company,
      currentlyWorking: data.currentlyWorking,
      startDate: data.startDate,
      endDate: isDate(data.endDate) ? data.endDate : null,
      description: data.description,
    }

    const formData = new FormData()
    if (experience) {
      formData.append('data', JSON.stringify(body))
      if (imageFile?.file) {
        formData.append('image', imageFile.file)
      }
      if (id) {
        const { isOk, error } = await editExperience(id, experience.id, formData)
        if (isOk) {
          onRequestClose(true)
        } else {
          if (error === 'Network Error') {
            addRequest(ExperienceApi.putRequest(id, experience.id, formData))
            onChangeOffline({ ...experience, ...body }, imageFile)
            onRequestClose(true)
          }
          console.error('something went wrong', error)
        }
      }
    } else {
      const newXP = Object.assign(body, { id: uuid() })
      formData.append('data', JSON.stringify(newXP))
      formData.append('image', imageFile?.file ?? null)
      if (id) {
        const { isOk, error } = await createExperience(id, formData)
        if (isOk) {
          onRequestClose(true)
        } else {
          if (error === 'Network Error') {
            addRequest(ExperienceApi.postRequest(id, formData))
            onChangeOffline(newXP, imageFile)
            onRequestClose(true)
          }
          console.error('something went wrong', error)
        }
      }
    }
  }

  const experienceHasImage = Boolean(experience && experience.image)

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
                {experienceHasImage && (
                  <img
                    alt='profile'
                    src={`${process.env.REACT_APP_BASE_URL}${experience?.image}`}
                    className='border-2 w-[150px] mt-3'
                  />
                )}
              </>
            )}
            <input {...getInputProps()} />
            <p className='text-center h-1/2 text-sm p-2 border'>
              Drag drop company logo here, or click to select files
            </p>
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
            {...register('title', { required: true })}
            labelProps={{ className: 'text-sm' }}
            label='Title'
            className='border rounded w-full'
            error={errors.title}
          />
          <TextInput
            {...register('company', { required: true })}
            labelProps={{ className: 'text-sm' }}
            label='Company'
            className='border rounded w-full'
            error={errors.company}
          />
          <div className='flex flex-row justify-between text'>
            <div className='w-full mr-2'>
              <TextInput
                {...register('startDate', { required: true })}
                labelProps={{ className: 'text-sm' }}
                label='Start Date'
                id='start-date'
                max={new Date().toISOString().split('T')[0]}
                type='date'
                className='border rounded w-full'
                error={errors.startDate}
              />
            </div>
            <div className='w-full ml-2'>
              <TextInput
                {...register('endDate', { required: true })}
                label='End Date'
                labelProps={{ className: 'text-sm' }}
                id='end-date'
                max={new Date().toISOString().split('T')[0]}
                type='date'
                disabled={currentlyWorking}
                className='border rounded w-full'
                error={errors.endDate}
              />
            </div>
          </div>
          <label className='mb-3' htmlFor='vehicle1'>
            <input type='checkbox' id='current' {...register('currentlyWorking')} />
            <span className='ml-2 text-sm'>Currently working here</span>
          </label>
          <TextAreaInput
            {...register('description', { required: true })}
            label='Description'
            labelProps={{ className: 'text-sm' }}
            className='border rounded w-full'
            error={errors.description}
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

export default ExperienceModalContent
