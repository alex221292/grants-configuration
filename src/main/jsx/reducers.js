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
      let grants = _.cloneDeep(state.grants);
      let operationGrants = grants[action.operationCode];
      if (!operationGrants) {
        operationGrants = {
          [action.rankCode]: {
            enabled: false
          }
        }
      } else {
        const grant = operationGrants[action.rankCode]
        if (!grant) {
          operationGrants = {
            ...operationGrants,
            [action.rankCode]: {
              enabled: false
            }
          }
        }
      }
      grants = {
        ...grants,
        [action.operationCode]: operationGrants
      }
      grants[action.operationCode][action.rankCode].enabled = !grants[action.operationCode][action.rankCode].enabled
      return {
        ...state,
        grants: grants
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
    case TYPE_CODES.ADD_OPERATION: {
      let operations = _.cloneDeep(state.operations);
      operations.push(action.operation)
      return {
        ...state,
        operations
      }
    }
    case TYPE_CODES.DELETE_OPERATION: {
      let operations = _.remove(
        state.operations,
        (val) => val.operationCode !== action.operationCode
      )
      return {
        ...state,
        operations
      }
    }
    case TYPE_CODES.SAVE_ATTRIBUTES: {
      let grants = {
        ...state.grants
      };
      let operationGrants = grants[action.operationCode];
      if (!operationGrants) {
        operationGrants = {
          [action.rankCode]: {
          }
        }
      } else {
        const grant = operationGrants[action.rankCode]
        if (!grant) {
          operationGrants = {
            ...operationGrants,
            [action.rankCode]: {
            }
          }
        }
      }
      grants = {
        ...grants,
        [action.operationCode]: operationGrants
      }
      grants[action.operationCode][action.rankCode].attributes = action.attributes
      return {
        ...state,
        grants: grants
      }
    }
    default:
      return state;
  }
}