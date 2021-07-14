import {TYPE_CODES} from "./const";
import _ from "lodash"

export default (state, action) => {
  switch (action.type) {
    case TYPE_CODES.LOAD_GRANTS: {
      if (action.data) {
        return {
          ...state,
          grants: action.data.grants,
          rankCodes: action.data.rankCodes,
          operations: action.data.operations
        }
      } else {
        return state;
      }
    }
    case TYPE_CODES.TOGGLE_GRANT: {
      let updatedGrants = _.cloneDeep(state.grants);
      updatedGrants[action.operationCode][action.rankCode] = !updatedGrants[action.operationCode][action.rankCode]
      return {
        ...state,
        grants: updatedGrants
      }
    }
    case TYPE_CODES.LOAD_SQL_SCRIPTS: {
      return {
        ...state,
        scripts: action.scripts
      }
    }
    case TYPE_CODES.ADD_RANK: {
      let rankCodes = _.cloneDeep(state.rankCodes);
      rankCodes.push(action.rankCode);
      return {
        ...state,
        rankCodes
      }
    }
    case TYPE_CODES.TOGGLE_POPUP: {
      return {
        ...state,
        showPopup: !state.showPopup
      }
    }
    case TYPE_CODES.DELETE_RANK: {
      let rankCodes = _.remove(
        state.rankCodes,
        (val) => val !== action.rankCode
      );
      return {
        ...state,
        rankCodes
      }
    }
    default:
      return state;
  }
}