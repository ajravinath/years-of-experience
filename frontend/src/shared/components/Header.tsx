import AuthContext from 'context/authContext'
import React, { useContext } from 'react'
import useAuth from 'shared/hooks/useAuth'
import { onSignedOut } from 'shared/util/authUtil'

export const Header = () => {
  const [isAuthenticated] = useAuth()
  const { setAuthModalOpen } = useContext(AuthContext)
  return (
    <div className='w-full flex bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 text-white text-center'>
      <div className='px-4 -mt-3'>
        <span className='mr-1 bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 text-gray text-6xl font-extrabold tracking-wide'>
          #
        </span>
        <span className='bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text text-6xl font-extrabold align-super tracking-wide underline'>
          yoe
        </span>
      </div>
      <div className='flex justify-end mx-3 ml-auto h-fit my-auto'>
        {isAuthenticated ? (
          <button
            title='Sign out'
            aria-label='Sign out'
            onClick={() => onSignedOut()}
            className='p-1 border rounded-full border-green-800 text-green-800 hover:text-white hover:border-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.636 5.636a9 9 0 1012.728 0M12 3v9'
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => setAuthModalOpen(true)}
            className='p-1 border rounded-lg px-2 border-green-800 text-green-800 hover:text-white hover:border-white'
          >
            Login
          </button>
        )}
      </div>
    </div>
  )
}
