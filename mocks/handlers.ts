// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
export const handlers = [
  // Handles a GET /user request
  http.get('https://pokeapi.co/api/v2/pokemon/:id', (req) => {
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
    const body = mockApiResponses[id.toString()]
    return HttpResponse.json(body)
  }),
]
