import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigators/AuthNavigator";
import MainNavigator from "./navigators/MainNavigator";

const Navigations = ()=>{
	const isLoggedIn = 0;
	return (
		<NavigationContainer>
			{ !isLoggedIn ? <AuthNavigator /> : <MainNavigator/> }
		</NavigationContainer>
	);
}

export default Navigations;