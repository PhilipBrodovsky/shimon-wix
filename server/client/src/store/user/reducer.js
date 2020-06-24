import * as Actions from './actions';

const initiateState = null;

export default (state = initiateState, action) => {
	const { type, payload } = action;
	switch (type) {
		case Actions.SET_USER: {
			return payload;
		}
		default:
			return state;
	}
};
