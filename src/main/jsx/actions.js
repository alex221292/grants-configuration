import {TYPE_CODES} from "./const";

export const addRank = (dispatch, rankCode) => {
  dispatch({type: TYPE_CODES.ADD_RANK, rankCode: rankCode})
}

export const deleteRank = (dispatch, rankCode) => {
  dispatch({type: TYPE_CODES.DELETE_RANK, rankCode: rankCode})
}

export const addOperation = (dispatch, operationCode, enabled) => {
  dispatch({type: TYPE_CODES.ADD_OPERATION, operation: {operationCode: operationCode, enabled: enabled}})
}

export const deleteOperation = (dispatch, operationCode) => {
  dispatch({type: TYPE_CODES.DELETE_OPERATION, operationCode: operationCode})
}

export const togglePopup = (dispatch, popupCode) => {
  dispatch({type: TYPE_CODES.TOGGLE_POPUP, popupCode: popupCode})
}