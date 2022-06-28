import { Route, Routes } from 'react-router-dom'
import BasicInfo from './info/BasicInfo'
import Experience from './experience/Experience'

function App() {
  return (
    <div>
      <div className='container mx-auto mt-10'>
        <div className='flex flex-col'>
          <Routes>
            <Route path='/'>
              <Route index element={<BasicInfo type='create' />} />
              <Route
                path=':id/profile'
                element={
                  <>
                    <BasicInfo type='edit' />
                    <Experience />
                  </>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
