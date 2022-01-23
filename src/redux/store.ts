import { configureStore, Store } from '@reduxjs/toolkit'
import reducer, { ReduxState } from './reducer'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './epic'
import { pokemonApi } from './services/pokemon'
import { useDispatch } from 'react-redux'
// Add Store Dependency Here (Do Not Delete This Line)

// convert object to string and store in localStorage
// const saveToLocalStorage = (state: ReduxState): void => {
//   try {
//     const serialisedState = JSON.stringify(state)
//     localStorage.setItem('ReactAppState', serialisedState)
//   } catch (e) {
//     console.warn(e)
//   }
// }

// load string from localStarage and convert into an Object
// invalid output must be undefined
// const loadFromLocalStorage = (): ReduxState | undefined => {
//   try {
//     const serialisedState = localStorage.getItem('ReactAppState') as
//       | string
//       | null
//     if (serialisedState === null || serialisedState === '') return undefined
//     return JSON.parse(serialisedState) as ReduxState
//   } catch (e) {
//     console.warn(e)
//     return undefined
//   }
// }

// const preloaded = loadFromLocalStorage()

export const setupStore = (preloaded?: Partial<ReduxState>) => {
  const epicMiddleware = createEpicMiddleware()

  const store = configureStore({
    reducer,
    preloadedState: preloaded,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware()
        .concat(epicMiddleware)
        .concat(pokemonApi.middleware)
      // Add API Service Middleware Here (do not delete this line)
    },
  })

  epicMiddleware.run(rootEpic)

  return store
}

// store.subscribe(() => saveToLocalStorage(store.getState()))

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>()

const store: Store = setupStore()
export default store
