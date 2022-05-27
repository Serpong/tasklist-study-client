import React from 'react';

import Icons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuScreen from '@src/screens/main/MenuScreen';
import FolderListScreen from '@src/screens/main/FolderListScreen';
import TaskListScreen from '@src/screens/main/TaskListScreen';
import GLOBALS from '@src/Globals';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TasksNavigator = ()=>{
	return (
		<Stack.Navigator screenOptions={{headerShown:false}}>
			<Stack.Screen name="folderList" component={FolderListScreen}/>
			<Stack.Screen name="taskList" component={TaskListScreen}/>
		</Stack.Navigator>
	)
}

const MainNavigator = ()=>{
	const getTabBarIcon = (iconName)=>({focused, color, size})=>{
		return <Icons name={iconName} size={size} color={color} />;
	}
	return (
		<Tab.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor:GLOBALS.COLORS.PRIMARY}} >
			<Tab.Screen
				name="tasks"
				component={TasksNavigator}
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