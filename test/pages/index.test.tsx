import React from 'react'
import { generalStore } from '../../stores/GeneralStore'
import SignInUp from '../../components/SignInUp'
import { render } from '@testing-library/react'
import { getByLabelText, screen } from '@testing-library/dom'

describe('Sign In/Up', () => {
  it('matches snapshot', () => {
    render(<SignInUp />)
    expect(screen.getByText(/enter name/i).textContent).toBe('Enter name')
  })
})
