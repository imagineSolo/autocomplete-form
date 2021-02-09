import axios from 'axios';

export const GET_USERS = 'GET_USERS';

export const getUsers = () => {
	return (dispatch) => {
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then((res) => {
				const response = res.data.map((user) => user.name);
				dispatch(getUsersAction(response));
			})
			.catch((err) => console.log(err.message));
	};
};

export const getUsersAction = (data) => {
	return {
		type: GET_USERS,
		data,
	};
};

export const actions = {
	getUsers,
};
