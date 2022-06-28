import axios from 'axios'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import AppContext from './appContext'
import GetRequest from './GetRequest'
import PostRequest from './PostRequest'
import PutRequest from './PutRequest'

type Props = { children: ReactNode }
type RequestType = GetRequest | PutRequest | PostRequest
const AppProvider = (props: Props) => {
  const { children } = props
  const [onLine, setOnline] = useState(navigator.onLine)
  const [refetch, setRefetch] = useState(0)
  const requests = useRef<{ [key: string]: RequestType }>({})

  const setRequests = (reqs: { [key: string]: RequestType }) => {
    requests.current = reqs
  }

  const handleOffline = useCallback((event: Event) => {
    console.log('offline', event)
    setOnline(false)
  }, [])

  const handleOnline = useCallback((event: Event) => {
    console.log('online', event)
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
      Object.entries(requests.current).map(async ([key, request]: [string, RequestType]) => {
        console.log(key)
        if (onLine) {
          if (request instanceof PostRequest) {
            await axios.post(request.url, request.formData)
            removeRequest(key)
          }
          if (request instanceof PutRequest) {
            await axios.put(request.url, request.formData)
            removeRequest(key)
          }
        }
        setRefetch((c) => ++c)
      })
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
