import { screen } from '@testing-library/react'
import BasicInfo from '../info/BasicInfo'
import { renderInRouter } from './utils'

describe('BasicInfo', () => {
  it('should render create profile button', () => {
    renderInRouter(<BasicInfo type='create' />)
    const buttonElement = screen.getByRole('button', { name: /create profile/i })
    expect(buttonElement).toBeInTheDocument()
  })

  it('should render create profile modal', () => {
    renderInRouter(<BasicInfo type='create' />)
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })
})
