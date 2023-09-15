import { Route, Routes } from 'react-router-dom'
import BasicInfoSection from './modules/info/BasicInfoSection'
import ExperienceSection from './modules/experience/ExperienceSection'

function App() {
  return (
    <div>
      <div className='container mx-auto mt-10'>
        <div className='flex flex-col'>
          <Routes>
            <Route path='/'>
              <Route index element={<BasicInfoSection type='create' />} />
              <Route
                path=':id/profile'
                element={
                  <>
                    <BasicInfoSection type='edit' />
                    <ExperienceSection />
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
