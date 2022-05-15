import React from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Container } from '../../components/layout/Components';


const TaskListScreen = (props)=>{
	const data = [
		{id:1, title:"title", writer:"me"},
		{id:2, title:"asdf", writer:"hongkildong"},
		{id:3, title:"ssss", writer:"heller"},
		{id:4, title:"fdg33", writer:"Lee"},
		{id:6, title:"sa", writer:"Kim"},
		{id:7, title:"title", writer:"hongkildong"},
	]

	const renderItem = ({ item })=>{
		return (
			<View style={styles.taskListItem}>
				<Text style={styles.taskListItemText}>{item.title}</Text>
			</View>
		);
	}

	return(
		<Container {...props} style={styles.container}>
			<FlatList
				style={styles.taskList}
				data={data}
				renderItem={renderItem}
				keyExtractor={item=>item.id}
			/>
		</Container>
	)
}

const styles = StyleSheet.create({
	container:{
		backgroundColor:'#fff',
		flex:1,
	},
	taskList:{
		flex:1,
		paddingHorizontal:15,
	},
	taskListItem:{
		backgroundColor: '#50a14f',
		padding:5,
		paddingVertical:70,
		marginVertical:10,
	},
	taskListItemText:{
		color:'#fff',
	}
});

export default TaskListScreen;