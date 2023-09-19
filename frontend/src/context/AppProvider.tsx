import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import AppContext, { RequestType } from './appContext'
import { Api } from '../shared/api'
import * as Rt from '../shared/api/models'

type Props = { children: ReactNode }
const AppProvider = (props: Props) => {
  const { children } = props
  const [onLine, setOnline] = useState(navigator.onLine)
  const [refetch, setRefetch] = useState(0)
  const requests = useRef<{ [key: string]: RequestType }>({})

  const setRequests = (reqs: { [key: string]: RequestType }) => {
    requests.current = reqs
  }

  const handleOffline = useCallback((event: Event) => {
    console.info('offline', event)
    setOnline(false)
  }, [])

  const handleOnline = useCallback((event: Event) => {
    console.info('online', event)
    setOnline(true)
  }, [])

  const addRequest = (request: RequestType) => {
    const timeMs = new Date().getTime().toString()
    setRequests({ ...requests.current, [timeMs]: request })
  }
  const removeRequest = (id: string) => {
    const newReq = { ...requests.current }
    delete newReq[id]
    setRequests(newReq)
  }

  useEffect(() => {
    const refetch = async () => {
      let profileId = null
      let experienceId = null
      for (const [key, request] of Object.entries(requests.current)) {
        console.log(key)
        if (onLine) {
          let tempResponse = null
          switch (request.type) {
            case 'ProfilePost':
              /** special case where created profile id is require to create associations */
              tempResponse = await Api.post(request.getUrl(), (request as Rt.ProfilePost).formData)
              profileId = tempResponse.data.data.id
              break
            case 'ProfilePut':
              await Api.put(request.getUrl(), (request as Rt.ProfilePut).formData)
              break
            case 'ExperiencePost':
              tempResponse = await Api.post(
                (request as Rt.ExperiencePost).getUrl(profileId),
                (request as Rt.ExperiencePost).formData,
              )
              experienceId = tempResponse.data.data.id
              break
            case 'ExperiencePut':
              await Api.put(
                request.getUrl(profileId, experienceId),
                (request as Rt.ExperiencePut).formData,
              )
              break
            default:
              break
          }
          removeRequest(key)
        }
        setRefetch((c) => ++c)
      }
    }
    refetch()
  }, [onLine])

  useEffect(() => {
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [handleOffline])

  return (
    <AppContext.Provider value={{ onLine, refetch, addRequest, removeRequest }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
