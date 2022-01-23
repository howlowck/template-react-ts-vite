import { Action, createAction } from '@reduxjs/toolkit'
import { Observable } from 'rxjs'
import { filter, mergeMap } from 'rxjs/operators'

export const star = createAction<{
  id: number // payload type (change me)
}>('epic/star')

export const starEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(star.match),
    mergeMap(action => {
      return [
        // output actions
      ]
    })
  )
