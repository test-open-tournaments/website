import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import HomePage from '../page'

test('Home page renders header', () => {
	render(<HomePage />)
	const header = screen.getByRole('heading', { name: 'TEST Open' })
	expect(header).toBeDefined()
})
