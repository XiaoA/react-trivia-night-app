import React, { useReducer, useContext } from 'react'
import { render } from '@testing-library/react'
import { GameProvider } from './contexts/GameContext'

const AllTheProviders = ({ children }) => {
  return (
    <GameProvider>
      {children}
    </GameProvider>
  )

}
const customRender = (game, options) =>
  render(game, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

