import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

export default function configureStore(preloadedState) {
	const middleware = applyMiddleware(thunkMiddleware);

	const store = createStore(rootReducer, preloadedState, middleware);

	return store;
}
