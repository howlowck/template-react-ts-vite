import { app } from './style.module.css'
import classnames from 'classnames'
import { ReduxState } from '../../../redux/reducer'
import React from 'react'
import { useSelector } from 'react-redux'
import Pokemon from '../../content/Pokemon'
import { useGetPokemonByIdQuery } from '../../../redux/services/pokemon'
import IdPicker from '../../content/IdPicker'

type Prop = {
  // put props typings here. i.e. "className: string"
}

const App: React.FC<Prop> = () => {
  const { id } = useSelector((state: ReduxState) => state.pokemon)
  const { data, error, isLoading } = useGetPokemonByIdQuery(`${id}`)
  return (
    <div className={classnames(app)}>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <Pokemon
            id={id}
            imageUrl={data.sprites.front_shiny}
            name={data.species.name}
          />
        </>
      ) : null}
      <IdPicker />
    </div>
  )
}

export default App
