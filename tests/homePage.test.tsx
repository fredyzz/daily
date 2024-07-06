import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'

vi.mock('@clerk/nextjs/server', () => {
  return {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userId: 'mockedUser_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
      ),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'mockedUser_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'Charles Harris',
      },
    }),
  }
})

test('HomePage', async () => {
  render(await HomePage())

  expect(screen.getByText(/track habits and mood/i)).toBeTruthy()
  expect(screen.getByText('get started')).toBeTruthy()
})
