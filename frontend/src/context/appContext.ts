/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import * as Rt from '../shared/api/models'

export type RequestType = Rt.ExperiencePost | Rt.ExperiencePut | Rt.ProfilePost | Rt.ProfilePut

export default React.createContext({
  refetch: 0,
  onLine: navigator.onLine,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addRequest: (request: RequestType) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeRequest: (id: string) => {},
})
