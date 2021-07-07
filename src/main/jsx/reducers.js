import {TYPE_CODES} from "./const";
import _ from "lodash"

export default (state, action) => {
  switch (action.type) {
    case TYPE_CODES.LOAD_GRANTS:
      if (action.data) {
        return {
          ...state,
          grants: action.data.grants,
          rankCodes: action.data.rankCodes,
          operationCodes: action.data.operationCodes
        }
      } else {
        return state;
      }
    case TYPE_CODES.TOGGLE_GRANT:
      let updatedGrants = _.cloneDeep(state.grants);
      updatedGrants[action.operationCode][action.rankCode] = !updatedGrants[action.operationCode][action.rankCode]
      return {
        ...state,
        grants: updatedGrants
      }
    default:
      return state;
  }
}