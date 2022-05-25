import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from "./reducers";
import Navigations from './Navigations';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const store = createStore(allReducers);

const App = ()=>{
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={store}>
				<Navigations />
			</Provider>
		</GestureHandlerRootView>
	);
}

export default App;