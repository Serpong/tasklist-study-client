import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Index from '../screens/auth/index';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = ()=>{
	return (
		<Stack.Navigator screenOptions={{headerShown:false,}}>
			<Stack.Screen name="Index" component={Index} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			{/* <Stack.Screen name="Login" component={LoginScreen}
				options={props=>({
					headerShown:true,
					header:()=><NewHeader {...props} />,
					headerTransparent: true,
				})}
			/> */}
		</Stack.Navigator>
	);
}

export default AuthNavigator;