import ActionType from '../Actions'
import {AuthUser} from '../common'

const token = localStorage.getItem("token") ?
    JSON.parse(localStorage.getItem("token")) : null;

const userInfo = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null;



const defaultState = {
  authUser: new AuthUser(token, userInfo),
  isFetching: false,
  fetchError: null
};

const authenticatedUser = (state=defaultState, action) => {
    switch (action.type) {
        case ActionType.RCV_ACCESS_TOKEN:
            return {
              ...state,
              authUser: new AuthUser(action.accessToken, null),
              isFetching: false
            };
        case ActionType.RCV_USER_INFO:
            return {
              ...state,
              authUser: new AuthUser(state.authUser.accessToken, action.data),
              isFetching: false
            };
      case ActionType.REQ_USER_INFO:
            return {
              ...state,
              isFetching: true
            };
      case ActionType.FETCH_ERROR:
          return {
            ...state,
            fetchError: true
          };
        default:
            return state
    }
};

export default authenticatedUser;