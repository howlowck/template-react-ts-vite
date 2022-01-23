import Pokemon from './index'

export default {
  title: 'Pokemon',
  component: Pokemon,
}

export const Main = () => (
  <Pokemon
    id={1}
    imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
    name="bulbasaur"
  />
)
