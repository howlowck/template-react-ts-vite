import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PokemonState = {
  id: number
}

const slice = createSlice({
  name: 'pokemon',
  initialState: {
    id: 1,
  } as PokemonState,
  reducers: {
    incrementId: state => {
      return { ...state, id: state.id + 1 }
    },
    decrementId: state => {
      return { ...state, id: state.id - 1 }
    },
    setId: (state, action: PayloadAction<number>) => {
      return { ...state, id: action.payload }
    },
  },
})

export const { incrementId, decrementId, setId } = slice.actions

export default slice.reducer
