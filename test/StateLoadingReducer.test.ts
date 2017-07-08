import {
  stateLoadingReducer,
  initialState,
  LoadStateInterface
} from "../src/Index"
import {
  startStateLoading,
  stateLoadingDone,
  stateLoadingFailed
} from "../src/Actions"

test("handles STATE_LOADING_START correctly", () => {
  const action = startStateLoading()
  const state = stateLoadingReducer(initialState, action)

  expect(state).toEqual({
    loading: true,
    loaded: false,
    failed: false,
    error: null
  })
})

test("handles STATE_LOADING_DONE correctly", () => {
  const action = stateLoadingDone()
  const state = stateLoadingReducer(initialState, action)

  expect(state).toEqual({
    loading: false,
    loaded: true,
    failed: false,
    error: null
  })
})

test("handles STATE_LOADING_FAILED correctly", () => {
  const error = new Error("Cannot connect to server")
  const action = stateLoadingFailed(error)
  const state = stateLoadingReducer(initialState, action)

  expect(state).toEqual({
    loading: false,
    loaded: false,
    failed: true,
    error
  })
})
