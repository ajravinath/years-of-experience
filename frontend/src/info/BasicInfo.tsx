import axios, { AxiosError } from 'axios'
import { differenceInYears, format, isDate, parse } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../context/appContext'
import ApiError from '../models/ApiError'
import Modal from '../shared/Modal'
import BasicInfoModalContent, { FileWithPreview } from './BasicInfoModalContent'

export type Info = {
  id: string
  firstName: string
  lastName: string
  title: string
  dob: string
  image: string
}

export type OfflineInfo = Omit<Info, 'dob' | 'image'> & { dob: string | Date }

type Props = {
  type: 'create' | 'edit'
}

const ageFromDob = (dob: string): number => {
  const date = parse(dob as string, 'yyyy-MM-dd', new Date())
  const age = differenceInYears(new Date(), date as Date)
  return age
}

const BasicInfo = (props: Props) => {
  const { type } = props
  const [openModal, setOpenModal] = useState<boolean>(() => type == 'create')
  const [info, setInfo] = useState<Info>()
  const [imageSrc, setImageSrc] = useState<string>('')

  const { id } = useParams()
  const { refetch } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInfo = async (id_: string) => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}api/profile/${id_}`)
        setInfo(data)
        setImageSrc(data.image ? `${process.env.REACT_APP_BASE_URL}${data.image}` : '')
      } catch (error) {
        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<ApiError>
          if (response && response.data.additional === 'not-found-error') {
            navigate('/', { replace: true })
          }
        }
      }
    }
    if (type === 'edit' && id) {
      fetchInfo(id)
    }
  }, [id, type, refetch])

  const handleModalClose = (refetch = false) => {
    setOpenModal(false)
    if (refetch && id) {
      const fetchInfo = async (id_: string) => {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}api/profile/${id_}`)
        setInfo(data)
        setImageSrc(data.image ? `${process.env.REACT_APP_BASE_URL}${data.image}` : '')
      }
      console.log('id: ', id)
      fetchInfo(id)
    }
  }

  const handleSetInfoOffline = (editInfo: OfflineInfo, editFile: FileWithPreview) => {
    if (editInfo.dob && isDate(editInfo.dob)) {
      editInfo.dob = format(editInfo.dob as Date, 'yyyy-MM-dd')
    }
    const newInfo = { ...info, ...editInfo } as Info
    if (editFile && editFile.preview) {
      newInfo.image = editFile.preview
    }
    console.log('newInfo: ', newInfo)
    setInfo(newInfo)
    setImageSrc(newInfo.image)
  }

  return (
    <div className='bg-white rounded-md p-4 mb-5'>
      {info ? (
        <div className='flex flex-row justify-left my-8 mx-4'>
          <div className='mr-5'>
            <img
              alt='company logo'
              src={imageSrc || 'https://i.imgur.com/8Km9tLL.jpg'}
              className='w-[80px] h-[80px]  rounded-full border-solid border-white border-2'
            />
          </div>
          <div className='grow'>
            <div className='flex flex-row justify-between'>
              <p className='text-3xl font-bold'>
                {info.firstName} {info.lastName}{' '}
                <span className='text-2xl font-normal'>
                  {info.dob ? `(${ageFromDob(info.dob)})` : <Skeleton />}
                </span>
              </p>
              <button
                className='border p-2 hover:bg-blue-800 hover:text-white hover:border-blue-900 font-semibold rounded-sm'
                onClick={() => setOpenModal(true)}
              >
                {type === 'create' ? 'Create profile' : 'Edit profile'}
              </button>
            </div>
            <p className='text-2xl'>{info.title}</p>
          </div>
        </div>
      ) : (
        <div className='flex flex-row my-8 mx-4'>
          <div className='w-[80px] h-[80px] my-auto mr-5 z-0'>
            <Skeleton circle className='h-full' />
          </div>
          <div className='flex flex-row grow'>
            <div className='grow basis-10/12 my-auto z-0'>
              <Skeleton height={20} count={3} className='mb-1 z-0 grow w-full' />
            </div>
            <div className='grow basis-2/12 text-right ml-4 my-auto'>
              <button
                className='border p-2 hover:bg-blue-800 hover:text-white hover:border-blue-900 font-semibold rounded-sm'
                onClick={() => setOpenModal(true)}
              >
                Create profile
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal
        title={type === 'create' ? 'Create Profile' : 'Edit Profile'}
        showModal={openModal}
        onRequestClose={handleModalClose}
        renderContent={(open, onRequestClose) => (
          <BasicInfoModalContent
            show={open}
            setInfoOffline={handleSetInfoOffline}
            onRequestClose={onRequestClose}
            info={info}
          />
        )}
      />
    </div>
  )
}

export default BasicInfo
