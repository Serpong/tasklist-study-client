import React from 'react';

import Icons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuScreen from '../screens/main/MenuScreen';
import TaskListScreen from '../screens/main/TaskListScreen';


const Tab = createBottomTabNavigator();

const MainNavigator = ()=>{
	const getTabBarIcon = (iconName)=>({focused, color, size})=>{
		return <Icons name={iconName} size={size} color={color} />;
	}
	return (
		<Tab.Navigator screenOptions={{headerShown:false}}>
			<Tab.Screen
				name="taskList"
				component={TaskListScreen}
				options={{
					tabBarIcon:getTabBarIcon("layers-outline"),
					tabBarLabel:"Tasks",
				}}
			/>
			<Tab.Screen
				name="menu"
				component={MenuScreen}
				options={{
					tabBarIcon:getTabBarIcon("menu-outline"),
					tabBarLabel:"Menu",
				}}
			/>
		</Tab.Navigator>
	);
}

export default MainNavigator;