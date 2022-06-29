import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const renderInRouter = (element: JSX.Element) =>
  render(<MemoryRouter initialEntries={['/']}>{element}</MemoryRouter>)
