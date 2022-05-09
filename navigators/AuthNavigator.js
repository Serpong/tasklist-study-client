import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Index from '../screens/auth';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createNativeStackNavigator();

const testLeft = (a,b)=>{
	console.log(a,b, this);
	return a;
}

const AuthNavigator = ()=>{
	return (
		<Stack.Navigator>
			<Stack.Screen name="Index" component={Index} />
			<Stack.Screen name="Login" component={LoginScreen} options={{headerLeft:testLeft}} />
		</Stack.Navigator>
	);
}

export default AuthNavigator;