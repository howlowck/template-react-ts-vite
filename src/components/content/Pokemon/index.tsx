import { pokemon } from './style.module.css'
import classnames from 'classnames'
import React from 'react'

type Prop = {
  /**
   * Pokemon Id
   */
  id: number
  name: string
  imageUrl: string
}

const Pokemon: React.FC<Prop> = ({ id, name, imageUrl }) => {
  return (
    <div className={classnames(pokemon)}>
      <h3>
        ID {id}: {name}
      </h3>
      <img src={imageUrl} alt={name} />
    </div>
  )
}

export default Pokemon
