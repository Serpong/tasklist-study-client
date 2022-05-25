import React, { useEffect, useState } from 'react';

import {StyleSheet, FlatList, TouchableOpacity, Text, Alert, } from 'react-native';
import Apis from '../utils/Apis';

const Jobs = {
	loadTaskList : async (setTaskList, folder_id, setRefreshing)=>{
		setRefreshing(true);
		const apiResult = await Apis.getTaskList({folder_id});
		setRefreshing(false);
		if(apiResult.error){
			Alert.alert("오류", apiResult.error.msg);
			return false;
		}
		setTaskList(Object.keys(apiResult.data).map(key=>(apiResult.data[key])));
		return true;
	},
}
const TaskList = ({taskList, setTaskList, folder_id, handleTaskListScroll, showEditTask, ...props})=>{
	
	const [refreshing, setRefreshing] = useState(true);

	useEffect(()=>{
		Jobs.loadTaskList(setTaskList, folder_id, setRefreshing);
	},[])


	const onPressTaskListItem = (_id)=>()=>{
		showEditTask(_id);
	}
	const renderItem = ({ item })=>{
		return (
			<TouchableOpacity style={styles.taskListItem} onPress={onPressTaskListItem(item._id)}>
				<Text style={styles.taskListItemText}>{item.content}</Text>
			</TouchableOpacity>
		);
	}

	return (
		<FlatList
			style={styles.taskList}
			contentContainerStyle={styles.taskListContainer}
			data={taskList}
			renderItem={renderItem}
			keyExtractor={item=>item._id}
			onScroll={handleTaskListScroll}
			refreshing={refreshing}
			onRefresh={()=>{Jobs.loadTaskList(setTaskList, folder_id, setRefreshing);}}
		/>
	);
}



const styles = StyleSheet.create({
	taskList:{
		flex:1,
	},
	taskListContainer:{
		marginHorizontal:10,
		padding:15,
		paddingTop:60,
	},
	taskListItem:{
		padding:10,
		backgroundColor:'#a34',
		marginVertical:5,
		borderRadius:5,
	},
	taskListItemText:{
		color:'#fff',
	},
});

export default TaskList;