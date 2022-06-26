import React, { useState } from 'react'
import { differenceInYears, parse } from 'date-fns'
import Modal from './Modal'
import BasicInfoModalContent from './BasicInfoModalContent'

// type Props = {}
export type Info = {
  firstName: string
  lastName: string
  dob: string
}

type Props = {
  info: Info
}

const ageFromDob = (dob: string): number => {
  const date = parse(dob, 'yyyy-MM-dd', new Date())
  const age = differenceInYears(new Date(), date)
  return age
}

const BasicInfo = (props: Props) => {
  const { info } = props
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className='bg-white rounded-md p-4 mb-5'>
      <div className='flex flex-row justify-left my-8 mx-4'>
        <div className='mr-5'>
          <img
            alt='company logo'
            src='https://i.imgur.com/8Km9tLL.jpg'
            className='rounded-full border-solid border-white border-2'
          />
        </div>
        <div className='grow'>
          <div className='flex flex-row justify-between'>
            <p className='text-3xl font-bold'>
              {info.firstName} {info.lastName}{' '}
              <span className='text-2xl font-normal'>({ageFromDob(info.dob)})</span>
            </p>
            <button
              className='mx-1 border p-2 hover:bg-blue-800 hover:text-white hover:border-blue-900 font-semibold rounded-sm'
              onClick={() => setOpenModal(true)}
            >
              Edit info
            </button>
          </div>
          <p className='text-2xl'>Senior Software Engineer</p>
        </div>
      </div>
      <Modal
        title='Add Experience'
        showModal={openModal}
        setShowModal={setOpenModal}
        content={<BasicInfoModalContent info={info} />}
      />
    </div>
  )
}

export default BasicInfo
