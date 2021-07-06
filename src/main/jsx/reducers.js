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
    default:
      return state;
  }
}