import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from "./reducers";
import Navigations from './Navigations';

const store = createStore(allReducers);

const App = ()=>{
	return (
		<Provider store={store}>
			<Navigations />
		</Provider>
	);
}

export default App;