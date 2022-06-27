import React, { ReactElement } from 'react'
import ReactModal from 'react-modal'

type Props = {
  showModal: boolean
  setShowModal: (open: boolean) => void
  content: ReactElement<{ showModal: boolean }>
  title: string
}

ReactModal.setAppElement('#root')

const Modal = (props: Props) => {
  const { showModal, setShowModal, content, title } = props
  return (
    <ReactModal
      className='modal-content'
      overlayClassName='modal-overlay'
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      contentLabel='Modal'
    >
      <div className='flex flex-col h-full'>
        <div className='flex'>
          <div className='text-2xl'>{title}</div>
          <button className='ml-auto' onClick={() => setShowModal(false)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              data-supported-dps='24x24'
              fill='currentColor'
              width='24'
              height='24'
              focusable='false'
            >
              <path d='M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z'></path>
            </svg>
          </button>
        </div>
        <hr className='mt-4' />
        <div className='mt-4'>{React.cloneElement(content, { showModal }, null)}</div>
      </div>
    </ReactModal>
  )
}

export default Modal