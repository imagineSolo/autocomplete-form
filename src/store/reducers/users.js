import * as actionTypes from '../actions/users';

const initialState = {
	users: [],
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_USERS:
			return {
				...state,
				users: action.data,
			};
		default:
			return state;
	}
};

export default usersReducer;
