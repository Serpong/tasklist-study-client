import React from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container } from '../../components/layout/Components';


const TaskListScreen = (props)=>{
	const data = [
		{id:1, title:"title", writer:"me"},
		{id:2, title:"asdf", writer:"hongkildong"},
		{id:3, title:"ssss", writer:"heller"},
		{id:4, title:"fdg33", writer:"Lee"},
		{id:5, title:"sa", writer:"Kim"},
		{id:6, title:"title", writer:"hongkildong"},
		{id:7, title:"fdg33", writer:"Lee"},
		{id:8, title:"sa", writer:"Kim"},
		{id:9, title:"title", writer:"hongkildong"},
		{id:10, title:"title", writer:"hongkildong"},
		{id:11, title:"title", writer:"hongkildong"},
	];


	const onPressTaskListItem=()=>{

	}


	const renderItem = ({ item })=>{
		return (
			<TouchableOpacity style={styles.taskListItem} onPress={onPressTaskListItem}>
				<Text style={styles.taskListItemText}>{item.title}</Text>
			</TouchableOpacity>
		);
	}

	return(
		<Container hasBack={true} hasBackNoPadding={true} {...props} style={styles.container}>
			<FlatList
				style={styles.taskList}
				contentContainerStyle={styles.taskListContainer}
				data={data}
				renderItem={renderItem}
				keyExtractor={item=>item.id}
			/>
		</Container>
	)
}

const styles = StyleSheet.create({
	container:{
		backgroundColor:'#aaa',
		flex:1,
	},
	taskList:{
		flex:1,
	},
	taskListContainer:{
		backgroundColor:'#fff',
		borderTopLeftRadius:15,
		borderTopRightRadius:15,
		padding:15,
		marginHorizontal:10,
		marginTop:100,
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

export default TaskListScreen;