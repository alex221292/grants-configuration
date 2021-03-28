import {dataExtractor} from "./components/main/dataExtractor";
import {TYPE_CODES} from "./const";

export default (state, action) => {
  switch (action.type) {
    case TYPE_CODES.INIT_GRANTS:
      if (action.data) {
        return {
          ...state,
          data: dataExtractor(action.data.grants),
          rankCodes: action.data.rankCodes
        }
      } else {
        return state;
      }
    case TYPE_CODES.UPDATE_GRANT:
      return updateOperationGrant(
        action.operationCode,
        action.rankCode,
        state
      )
    default:
      return state;
  }
}

const updateOperationGrant = (operationCode, rankCode, state) => {
  const idx = state.data.findIndex(operation => operation.operationCode === operationCode);
  let dataCopy = [...state.data];
  dataCopy[idx] = {
    ...dataCopy[idx],
    [rankCode]: !dataCopy[idx][rankCode]
  }
  return {
    ...state,
    data: dataCopy
  };
}
