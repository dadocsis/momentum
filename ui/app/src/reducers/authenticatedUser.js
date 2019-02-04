import ActionType from '../Actions'
import {AuthUser} from '../common'

const token = localStorage.getItem("token") ?
    JSON.parse(localStorage.getItem("token")) : null;

const userInfo = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null;



const defaultState = {authUser: new AuthUser(token, userInfo)};

const authenticatedUser = (state=defaultState, action) => {
    switch (action.type) {
        case ActionType.RCV_ACCESS_TOKEN:
            return {authUser: new AuthUser(action.accessToken, state.authUser.userInfo)};
        default:
            return state
    }
};

export default authenticatedUser;