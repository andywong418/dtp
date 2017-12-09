import * as types from '../actions/types';

const generateState = () => {
	return {
		lat: null,
		lng: null,
		city: null
	}
}

const copyState = (state) => {
	return Object.assign({}, state)
}

const initialState = generateState();

const locationReducer = (state = initialState, action) => {
	let newState = copyState(state);
	switch (action.type) {
		case types.UPDATE_LOCATION:
			newState.lat = action.lat;
			newState.lng = action.lng;
			newState.city = action.city;
			return newState;
		default:
			return state;
	}
};

export default locationReducer;
