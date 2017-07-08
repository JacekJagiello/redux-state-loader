import { FSA, ErrorFSA } from "flux-standard-action"
import { createAction } from "redux-actions"
import { Action } from "redux"
import { LoadStateInterface, initialState } from "./redux-state-loader"

export const STATE_LOADING_START = "@@redux-state-loader/STATE_LOADING_START"
export const STATE_LOADING_DONE = "@@redux-state-loader/STATE_LOADING_DONE"
export const STATE_LOADING_FAILED = "@@redux-state-loader/STATE_LOADING_FAILED"

export function startStateLoading(): FSA<any, any> {
  return {
    type: "@@redux-state-loader/STATE_LOADING_START",
    payload: initialState,
    meta: {}
  }
}

export function stateLoadingDone(payload = {}): FSA<any, any> {
  return {
    type: STATE_LOADING_DONE,
    payload,
    meta: {}
  }
}

export function stateLoadingFailed(payload = {}): ErrorFSA<any, any> {
  return {
    type: STATE_LOADING_FAILED,
    error: true,
    payload,
    meta: {}
  }
}
