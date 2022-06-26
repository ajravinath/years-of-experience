import React, { useState } from 'react'
import ExperienceModalContent from './ExperienceModalContent'
import Modal from './Modal'

export type ExperienceItem = {
  title: string
  company: string
  currentlyWorking: boolean
  startDate: string
  endDate: string
  description: string
}
type Props = {
  experience: ExperienceItem[]
}

const Experience = (props: Props) => {
  const { experience } = props
  const [expand, setExpand] = useState<boolean>(false)
  const [editModal, setEditModal] = useState<number>(-1)
  const [addModal, setAddModal] = useState<boolean>(false)

  return (
    <div className='bg-white rounded-md p-4'>
      <div className='flex flex-row justify-between'>
        <p className='mx-4 mt-4 text-3xl font-bold'>Experience</p>
        <button
          className='mx-4 mt-4 border p-2 hover:bg-blue-800 hover:text-white hover:border-blue-900 font-semibold rounded-sm'
          onClick={() => setAddModal(true)}
        >
          Add Experience
        </button>
      </div>
      {experience.map((xp, index) => (
        <div key={index} className='flex flex-row justify-left my-8 mx-4'>
          <div className='mr-5'>
            <img
              alt='profile'
              src='https://seeklogo.com/images/G/glints-logo-C73B9B9D49-seeklogo.com.png'
              className='border-solid border-white border-2 w-12 mt-3'
            />
          </div>
          <div tabIndex={0} className='basis-11/12' onClick={() => setExpand((open) => !open)}>
            <p className='text-xl font-bold'>{xp.title}</p>
            <p className='text-md'>{xp.company}</p>
            <p className='text-md'>
              {xp.startDate} - {xp.currentlyWorking ? 'Present' : xp.endDate}
            </p>
            <p className={`text-md ${expand ? '' : 'line-clamp-3'}`}>{xp.description}</p>
          </div>
          <button onClick={() => setEditModal(index)}>Edit</button>
          <Modal
            title='Edit Experience'
            showModal={editModal === index}
            setShowModal={(open) => setEditModal(open ? index : -1)}
            content={<ExperienceModalContent experience={xp} />}
          />
        </div>
      ))}
      <Modal
        title='Add Experience'
        showModal={addModal}
        setShowModal={setAddModal}
        content={<ExperienceModalContent />}
      />
    </div>
  )
}

export default Experience
