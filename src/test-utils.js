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

// https://stackoverflow.com/questions/48809753/testing-mutationobserver-with-jest/60974039#60974039

const mutationObserverMock = jest.fn(function MutationObserver(callback) {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
    // Optionally add a trigger() method to manually trigger a change
    this.trigger = (mockedMutationsList) => {
        callback(mockedMutationsList, this);
    };
});
global.MutationObserver = mutationObserverMock;

// https://stackoverflow.com/questions/48809753/testing-mutationobserver-with-jest
// global.MutationObserver = class {
//     constructor(callback) {}
//     disconnect() {}
//     observe(element, initObject) {}
// };


const customRender = (game, options) =>
  render(game, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

