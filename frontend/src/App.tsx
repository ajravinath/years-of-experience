import { Route, Routes } from 'react-router-dom'
import BasicInfo from './BasicInfo'
import Experience from './Experience'

function App() {
  const info = {
    firstName: 'Anuja',
    lastName: 'Ranwalage',
    dob: '1994-11-12',
  }
  const experience = [
    {
      title: 'Senior Engineer',
      company: 'Google Inc.',
      startDate: '2021-08-21',
      endDate: '',
      currentlyWorking: true,
      description:
        'Worked as a Senior Engineer in the Google&apos;s Android core team. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mi justo, efficitur eget risus in, mattisdignissim purus. Praesent maximus aliquet leo, at maximus justo tristique vulputate.Curabitur congue mauris quis interdum hendrerit. Sed ornare vehicula lacus at sodales.Cras semper suscipit finibus. Maecenas venenatis urna urna, ac tempus risus lobortis',
    },
    {
      title: 'Junior Engineer',
      company: 'Apple Inc.',
      startDate: '2020-08-01',
      endDate: '2021-08-15',
      currentlyWorking: false,
      description:
        'Worked as a Junior Engineer in the Apple&apos;s IOS core team. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mi justo, efficitur eget risus in, mattisdignissim purus. Praesent maximus aliquet leo, at maximus justo tristique vulputate.Curabitur congue mauris quis interdum hendrerit. Sed ornare vehicula lacus at sodales.Cras semper suscipit finibus. Maecenas venenatis urna urna, ac tempus risus lobortis',
    },
  ]
  return (
    <div>
      <div className='container mx-auto mt-10'>
        <div className='flex flex-col'>
          <Routes>
            <Route path='/'>
              <Route index element={<BasicInfo type='create' info={info} />} />
              <Route
                path=':id/profile'
                element={
                  <>
                    <BasicInfo type='edit' info={info} />
                    <Experience experience={experience} />
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
