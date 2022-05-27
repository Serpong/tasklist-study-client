import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IndexScreen from '@src/screens/auth/IndexScreen';
import LoginScreen from '@src/screens/auth/LoginScreen';
import SignUpScreen from '@src/screens/auth/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = ({...props})=>{
	return (
		<Stack.Navigator screenOptions={{headerShown:false,}}>
			<Stack.Screen name="Index" component={IndexScreen} />
			<Stack.Screen name="Login" component={LoginScreen}/>
			<Stack.Screen name="SignUp" component={SignUpScreen} />
		</Stack.Navigator>
	);
}

export default AuthNavigator;