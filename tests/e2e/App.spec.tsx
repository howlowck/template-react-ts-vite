import { rest } from 'msw'
import { screen } from '@testing-library/react'
import { server } from '../../mocks/server'
import { renderWithProviders } from '../../src/test-utils'
import App from '../../src/components/layouts/App'

describe('App', () => {
  it('handles good response', async () => {
    const app = <App />
    renderWithProviders(app)

    screen.getByText('Loading...')

    await screen.findByRole('heading', { name: /bulbasaur/i })
    // screen.debug()

    const img = screen.getByRole('img', {
      name: /bulbasaur/i,
    }) as HTMLImageElement

    expect(img.src).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png'
    )
  })

  it('handles error response', async () => {
    // force msw to return error response
    server.use(
      rest.get('https://pokeapi.co/api/v2/pokemon/1', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    renderWithProviders(<App />)

    screen.getByText('Loading...')

    await screen.findByText('Oh no, there was an error')
  })
})
