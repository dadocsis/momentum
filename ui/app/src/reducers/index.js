import { combineReducers } from 'redux'
import authUser from './authenticatedUser'


const app = combineReducers({
    authUser,
});

export default app;