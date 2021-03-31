import {TYPE_CODES} from "./const";

export default (state, action) => {
  switch (action.type) {
    case TYPE_CODES.LOAD_GRANTS:
      if (action.data) {
        return {
          ...state,
          grants: action.data.grants,
          rankCodes: action.data.rankCodes
        }
      } else {
        return state;
      }
    case TYPE_CODES.LOAD_SQL_SCRIPTS:
      return {
        ...state,
        scripts: action.scripts
      }
    case TYPE_CODES.MARK_QUERY_EXECUTED:
      return {
        ...state,
      isQueryExecutedOnce: state.isQueryExecutedOnce === true ? state.isQueryExecutedOnce : true
      }
    default:
      return state;
  }
}