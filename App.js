import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './navigators/AuthNavigator';
import MainNavigator from './navigators/MainNavigator';

const App = ()=>{
	const [loggedIn, setLoggedIn] = useState(false);
	return (
		<NavigationContainer>
			{
				!loggedIn ? <AuthNavigator /> : <MainNavigator/>
			}
		</NavigationContainer>
	);
}

export default App;