import axios from 'axios'
import { format, isDate } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../context/appContext'
import { FileWithPreview } from '../info/BasicInfoModalContent'
import Modal from '../shared/Modal'
import ExperienceModalContent from './ExperienceModalContent'

export type ExperienceItem = {
  id: string
  title: string
  company: string
  currentlyWorking: boolean
  startDate: string
  image?: string
  endDate: string | null
  description: string
}

export type ExperienceItemOffline = {
  startDate: Date | string
  endDate: Date | null | string
} & Omit<ExperienceItem, 'startDate' | 'endDate'>

type ExperienceData = { [key: string]: ExperienceItem }

const Experience = () => {
  const [expand, setExpand] = useState<boolean>(false)
  const [editModal, setEditModal] = useState<number>(-1)
  const [addModal, setAddModal] = useState<boolean>(false)

  const [experience, setExperience] = useState<ExperienceData>({})

  const { id } = useParams()
  const { refetch } = useContext(AppContext)

  useEffect(() => {
    const fetchExperience = async (id_: string) => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/profile/${id_}/experience`,
      )
      setExperience(
        data.reduce((accum: ExperienceData, curr: ExperienceItem) => {
          return { ...accum, [curr.id]: curr }
        }, {}),
      )
    }
    if (id) {
      fetchExperience(id)
    }
  }, [id, refetch])

  const handleAddEditModalClose =
    (modalItem: 'add' | 'edit') =>
    (refetch = false) => {
      modalItem === 'add' ? setAddModal(false) : setEditModal(-1)
      if (refetch && id) {
        const fetchExperience = async (id_: string) => {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}api/profile/${id_}/experience`,
          )
          setExperience(data)
        }
        fetchExperience(id)
      }
    }

  const handleExperienceOffline = (xp: ExperienceItemOffline, editFile: FileWithPreview) => {
    if (editFile && editFile.preview) {
      xp.image = editFile.preview
    }
    if (xp.startDate && isDate(xp.startDate)) {
      xp.startDate = format(xp.startDate as Date, 'yyyy-MM-dd')
    }
    if (xp.endDate && isDate(xp.endDate)) {
      xp.endDate = format(xp.endDate as Date, 'yyyy-MM-dd')
    }
    const newExperience = { ...experience, [xp.id]: xp } as ExperienceData
    setExperience(newExperience)
  }

  const experiencesList = Object.values(experience).sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  )

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
      {experiencesList.map((xp, index, array) => (
        <div key={index}>
          <div className='flex flex-row justify-left my-8 mx-4'>
            <div className='mr-5'>
              <img
                alt='profile'
                src={
                  xp.image
                    ? `${process.env.REACT_APP_BASE_URL}${xp.image}`
                    : 'https://seeklogo.com/images/G/glints-logo-C73B9B9D49-seeklogo.com.png'
                }
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
            <div className='basis-1/12 text-end my-auto'>
              <button
                className='border px-5 py-1 hover:bg-blue-800 text-sm font-semibold hover:text-white hover:border-blue-900 rounded-sm'
                onClick={() => setEditModal(index)}
              >
                Edit
              </button>
            </div>
            <Modal
              title='Edit Experience'
              showModal={editModal === index}
              onRequestClose={handleAddEditModalClose('edit')}
              renderContent={(show, setShow) => (
                <ExperienceModalContent
                  experience={xp}
                  onChangeOffline={handleExperienceOffline}
                  show={show}
                  onRequestClose={setShow}
                />
              )}
            />
          </div>
          {array.length - 1 !== index && <hr className='mx-4' />}
        </div>
      ))}
      <Modal
        title='Add Experience'
        showModal={addModal}
        onRequestClose={handleAddEditModalClose('add')}
        renderContent={(open, onRequestClose) => (
          <ExperienceModalContent
            show={open}
            onChangeOffline={handleExperienceOffline}
            onRequestClose={onRequestClose}
          />
        )}
      />
    </div>
  )
}

export default Experience
