import { Reducer, Store } from "redux"
import { handleActions } from "redux-actions"

import {
  STATE_LOADING_START,
  STATE_LOADING_DONE,
  STATE_LOADING_FAILED,
  startStateLoading,
  stateLoadingDone,
  stateLoadingFailed
} from "./Actions"

export interface LoadStateInterface {
  loading: boolean
  loaded: boolean
  failed: boolean
  error: any
}

export const initialState: LoadStateInterface = {
  loading: false,
  loaded: false,
  failed: false,
  error: null
}

export type LoadingStateFunction<T> = () => Promise<T>

export function stateLoadingMiddleware(
  loadingStateFunction: LoadingStateFunction<any>
) {
  return (store: Store<any>) => {
    store.dispatch(startStateLoading())

    loadingStateFunction()
      .then(state => store.dispatch(stateLoadingDone(state)))
      .catch(error => store.dispatch(stateLoadingFailed(error)))

    return next => action => next(action)
  }
}

export const stateLoadingReducer = handleActions<LoadStateInterface>(
  {
    [STATE_LOADING_START]: state => Object.assign({}, state, { loading: true }),
    [STATE_LOADING_DONE]: state =>
      Object.assign({}, state, { loading: false, loaded: true }),
    [STATE_LOADING_FAILED]: (state, action) =>
      Object.assign({}, state, { loading: false, failed: true, error: action.payload })
  },
  initialState
)

export function waitForState<S>(appReducer: Reducer<S>): Reducer<S> {
  return (state: S, action: any) => {
    if (action.type === STATE_LOADING_DONE) {
      return appReducer(action.payload, action)
    }

    return appReducer(state, action)
  }
}
