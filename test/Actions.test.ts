import { isFSA } from "flux-standard-action"

import {
  STATE_LOADING_START,
  STATE_LOADING_DONE,
  STATE_LOADING_FAILED,
  startStateLoading,
  stateLoadingDone,
  stateLoadingFailed
} from "../src/Actions"

import { LoadStateInterface } from "../src/Index"

describe(`action: startStateLoading`, () => {
  test("is vaild FSA action", () => {
    const startStateLoadingAction = startStateLoading()
    expect(isFSA(startStateLoadingAction)).toBe(true)
  })
})

describe(`action: stateLoadingDone`, () => {
  test("is vaild FSA action", () => {
    const stateLoadingDoneAction = stateLoadingDone()
    expect(isFSA(stateLoadingDoneAction)).toBe(true)
  })
})

describe(`action: stateLoadingFailed`, () => {
  test("is vaild FSA action", () => {
    const stateLoadingFailedAction = stateLoadingFailed({})
    expect(isFSA(stateLoadingFailedAction)).toBe(true)
  })

  test("it has error", () => {
    const stateLoadingFailedAction = stateLoadingFailed({})
    expect(stateLoadingFailedAction.error).toBe(true)
  })
})
