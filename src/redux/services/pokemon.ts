import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Pokemon = {
  species: { name: string }
  sprites: { front_shiny: string }
}

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemonById: builder.query<Pokemon, string>({
      query: id => `pokemon/${id}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByIdQuery } = pokemonApi
