import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IndexScreen from '../screens/main/IndexScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = ()=>{
	return (
		<Stack.Navigator screenOptions={{headerShown:false,}}>
			<Stack.Screen name="Index" component={IndexScreen} />
		</Stack.Navigator>
	);
}

export default MainNavigator;