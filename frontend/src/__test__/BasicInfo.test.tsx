import { screen } from '@testing-library/react'
import BasicInfoSection from '../modules/info/BasicInfoSection'
import { renderInRouter } from './utils'

describe('BasicInfo', () => {
  it('should render create profile button', () => {
    renderInRouter(<BasicInfoSection type='create' />)
    const buttonElement = screen.getByRole('button', { name: /create profile/i })
    expect(buttonElement).toBeInTheDocument()
  })

  it('should render create profile modal', () => {
    renderInRouter(<BasicInfoSection type='create' />)
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })
})
