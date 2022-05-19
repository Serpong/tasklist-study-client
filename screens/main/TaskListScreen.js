import React, { useState, useRef, useEffect } from 'react';

import { Alert, Animated, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container } from '../../components/layout/Components';
import Apis from '../../utils/Apis';


const TaskListScreen = (props)=>{
	const [taskList, setTaskList] = useState([]);
	const {route:{params:{folderData}}} = props;

	useEffect(()=>{
		Apis.getTaskList({folder_id:props.route.params.folderData._id})
			.then(apiResult=>{
				if(apiResult.error)
					Alert.alert("로그인 오류", apiResult.error.msg);
				else{
					setTaskList(Object.keys(apiResult.data).map(key=>({...apiResult.data[key], _id:key})));
				}
			});
	},[])

	const onPressTaskListItem=()=>{
	}

	const renderItem = ({ item })=>{
		return (
			<TouchableOpacity style={styles.taskListItem} onPress={onPressTaskListItem}>
				<Text style={styles.taskListItemText}>{item.content}</Text>
			</TouchableOpacity>
		);
	}

	
	const scrollY = useRef(new Animated.Value(1)).current;
	const taskListTitleOpacity = scrollY.interpolate({
		inputRange: [10, 25, 40],
		outputRange: [1, 0.2, 0],
		extrapolate: 'clamp',
	})
	const handleTaskListScroll = (e)=>{
		scrollY.setValue(e.nativeEvent.contentOffset.y);
	}

	return(
		<Container hasBack={true} hasBackNoPadding={true} {...props} style={styles.container}>
			<Animated.Text style={{...styles.taskListTitle, opacity:taskListTitleOpacity,}}>{folderData.title}</Animated.Text>
			
			<FlatList
				style={styles.taskList}
				contentContainerStyle={styles.taskListContainer}
				data={taskList}
				renderItem={renderItem}
				keyExtractor={item=>item.id}
				onScroll={handleTaskListScroll}
			/>
		</Container>
	)
}

const styles = StyleSheet.create({
	container:{
		backgroundColor:'#fff',
		flex:1,
	},
	taskListTitle:{
		position:'absolute',
		height:60,
		top:0,
		width:'100%',
		textAlign:'center',
		textAlignVertical:'center',
		fontSize:18,
		fontWeight:'bold',
	},
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

export default TaskListScreen;