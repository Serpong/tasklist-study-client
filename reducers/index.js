import { combineReducers } from "redux";

import userReducer from './userReducer';
import testReducer from './testReducer';
import modalReducer from './modalReducer';

const allReducers = combineReducers({
	userReducer,
	testReducer,
	modalReducer, 
});

export default allReducers;