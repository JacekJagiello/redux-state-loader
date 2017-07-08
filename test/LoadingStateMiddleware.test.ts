import { stateLoadingMiddleware } from "../src/redux-state-loader"
import {
  startStateLoading,
  stateLoadingDone,
  stateLoadingFailed
} from "../src/Actions"
const configureStore = require("redux-mock-store-jest")

const successfullyLoadState = () => new Promise(resolve => resolve({}))
const failToLoadState = () => new Promise(resolve => resolve({}))

test("It dispatches STATE_LOADING_START action", done => {
  const middleware = stateLoadingMiddleware(successfullyLoadState)
  const mockStore = configureStore([middleware])

  const expectedActions = [startStateLoading()]

  mockStore({}, expectedActions, done)
})

test("It dispatches STATE_LOADING_DONE action, when stateLoadingFunction resolves new state", done => {
  const middleware = stateLoadingMiddleware(successfullyLoadState)
  const mockStore = configureStore([middleware])

  const expectedActions = [startStateLoading(), stateLoadingDone()]

  mockStore({}, expectedActions, done)
})

test("It dispatches STATE_LOADING_FAILED action, when stateLoadingFunction rejects", done => {
  const middleware = stateLoadingMiddleware(failToLoadState)
  const mockStore = configureStore([middleware])

  const expectedActions = [startStateLoading(), stateLoadingFailed()]

  mockStore({}, expectedActions, done)
})
