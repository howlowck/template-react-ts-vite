import { idPicker } from './style.module.css'
import { incrementId, decrementId, setId } from '../../../redux/slices/pokemon'
import classnames from 'classnames'
import React from 'react'
import { useAppDispatch } from '../../../redux/store'
import { ReduxState } from '../../../redux/reducer'
import { useSelector } from 'react-redux'

type Prop = {
  // id?: number
}

const IdPicker: React.FC<Prop> = () => {
  const { id } = useSelector((state: ReduxState) => state.pokemon)
  const dispatch = useAppDispatch()
  return (
    <div className={classnames(idPicker)}>
      <button onClick={() => dispatch(decrementId())}>-</button>
      <input
        title="id-input"
        type="number"
        value={id}
        onChange={evt => {
          dispatch(setId(parseInt(evt.currentTarget.value, 10)))
        }}
      />
      <button onClick={() => dispatch(incrementId())}>+</button>
    </div>
  )
}

export default IdPicker
