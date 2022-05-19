import { combineReducers } from "redux";

import userReducer from './userReducer';
import testReducer from './testReducer';

const allReducers = combineReducers({
	userReducer,
	testReducer,
});

export default allReducers;