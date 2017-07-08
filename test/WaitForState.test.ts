import { waitForState } from "../src/redux-state-loader"
import { stateLoadingDone } from "../src/Actions"

interface ExmapleState {
  products: string[]
}

const initialState = {
  products: ["milk", "apple"]
}

const reducer = (state: ExmapleState, action) => state

test("it returns reducer with initial state, when action is difrent than STATE_LOADING_DONE", () => {
  const wrappedReducer = waitForState<ExmapleState>(reducer)

  const newState = wrappedReducer(initialState, { type: "EXAMPLE_ACTION" })

  expect(newState).toEqual(initialState)
})

test("it returns reducer with new state, on STATE_LOADING_DONE action", () => {
  const wrappedReducer = waitForState<ExmapleState>(reducer)
  const loadedState: ExmapleState = { products: ["butter", "bananas", "cakes"] }

  const newState = wrappedReducer(initialState, stateLoadingDone(loadedState))

  expect(newState).toEqual(loadedState)
})
