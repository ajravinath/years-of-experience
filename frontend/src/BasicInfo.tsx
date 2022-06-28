import React, { useEffect, useState } from 'react'
import { differenceInYears, parse } from 'date-fns'
import Modal from './Modal'
import BasicInfoModalContent from './BasicInfoModalContent'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// type Props = {}
export type Info = {
  id: number
  firstName: string
  lastName: string
  title: string
  dob: string
  image: string
}

type Props = {
  type: 'create' | 'edit'
}

const ageFromDob = (dob: string): number => {
  const date = parse(dob, 'yyyy-MM-dd', new Date())
  const age = differenceInYears(new Date(), date)
  return age
}

const BasicInfo = (props: Props) => {
  const { type } = props
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [info, setInfo] = useState<Info>()

  const { id } = useParams()

  useEffect(() => {
    const fetchInfo = async (id_: number) => {
      const { data } = await axios.get(`http://localhost:8000/api/profile/${id_}`)
      setInfo(data)
    }
    if (type === 'edit' && id) {
      fetchInfo(parseInt(id, 10))
    }
  }, [id, type])

  const handleModalClose = (refetch = false) => {
    setOpenModal(false)
    if (refetch && id) {
      const fetchInfo = async (id_: number) => {
        const { data } = await axios.get(`http://localhost:8000/api/profile/${id_}`)
        setInfo(data)
      }
      console.log('id: ', id)
      fetchInfo(parseInt(id, 10))
    }
  }

  return (
    <div className='bg-white rounded-md p-4 mb-5'>
      {info ? (
        <div className='flex flex-row justify-left my-8 mx-4'>
          <div className='mr-5'>
            <img
              alt='company logo'
              src={`http://localhost:8000/${info.image}` || 'https://i.imgur.com/8Km9tLL.jpg'}
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
        title='Add Experience'
        showModal={openModal}
        onRequestClose={handleModalClose}
        renderContent={(open, onRequestClose) => (
          <BasicInfoModalContent show={open} onRequestClose={onRequestClose} info={info} />
        )}
      />
    </div>
  )
}

export default BasicInfo
