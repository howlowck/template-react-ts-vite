import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import AppStore, { setupStore } from './redux/store'
import { type ReduxState } from './redux/reducer'
import type { PreloadedState } from '@reduxjs/toolkit'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store. For
// future dependencies, such as wanting to test with react-router, you can extend
// this interface to accept a path and route and use those in a <MemoryRouter />
type ExtendedRenderOptions = {
  preloadedState?: PreloadedState<ReduxState>
  store?: typeof AppStore
} & Omit<RenderOptions, 'queries'>

function renderWithProviders(
  ui: React.ReactElement,
  {
    // preloadedState = {},
    store = setupStore(),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export { renderWithProviders }
