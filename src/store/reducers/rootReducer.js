import { combineReducers } from 'redux';
import usersReducer from './users';

export const rootReducer = combineReducers({
	users: usersReducer,
});

export default rootReducer;
