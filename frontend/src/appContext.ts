/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import GetRequest from './GetRequest'
import PostRequest from './PostRequest'
import PutRequest from './PutRequest'

export default React.createContext({
  refetch: 0,
  onLine: navigator.onLine,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addRequest: (request: GetRequest | PutRequest | PostRequest) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeRequest: (id: string) => {},
})
