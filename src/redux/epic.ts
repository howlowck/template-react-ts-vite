import { combineEpics, Epic } from 'redux-observable'
import { catchError } from 'rxjs/operators'
import { starEpic } from './epics/starEpic'
// Import Epics Here (do not delete this line)

const epics: Epic[] = [
  starEpic,
  // Add Epics Here (do not delete this line)
]

const rootEpic: Epic = (action$, store$, dependencies) =>
  combineEpics(...epics)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error)
      return source
    })
  )

export default rootEpic
