// src/mocks/handlers.js
import { rest } from 'msw'
export const handlers = [
  // Handles a GET /user request
  rest.get('https://pokeapi.co/api/v2/pokemon/:id', (req, res, ctx) => {
    const { id } = req.params

    const mockApiResponses: { [key: string]: object } = {
      '1': {
        species: {
          name: 'bulbasaur',
        },
        sprites: {
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
        },
      },
      '2': {
        species: {
          name: 'ivysaur',
        },
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
        },
      },
      '3': {
        species: {
          name: 'venusaur',
        },
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
        },
      },
    }
    return res(ctx.json(mockApiResponses[id as string]))
  }),
]
