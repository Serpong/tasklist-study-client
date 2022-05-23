import React, { useState, useRef, useEffect } from 'react';

import { Alert, Animated, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BtnPrimary, Container, InputCircle, InputPrimary } from '../../components/layout/Components';
import Apis from '../../utils/Apis';

import Icons from 'react-native-vector-icons/Ionicons';
import { useInputs } from '../../utils/componentUtils';

const Jobs = {
	loadTaskList : async (setTaskList, folder_id)=>{
		const apiResult = await Apis.getTaskList({folder_id});
		if(apiResult.error){
			Alert.alert("오류", apiResult.error.msg);
			return false;
		}
		setTaskList(Object.keys(apiResult.data).map(key=>(apiResult.data[key])));
		return true;
	},
	insertTaskList: async (setTaskList, content, folder_id )=>{
		const apiResult = await Apis.insertTask({ content, folder_id, });
		if(apiResult.error){
			Alert.alert("오류", apiResult.error.msg);
			return false;
		}
		setTaskList(taskList=>[...taskList, apiResult.data]);
		return true;
	},
}

const TaskListScreen = (props)=>{
	const [taskList, setTaskList] = useState([]);
	const {route:{params:{folderData}}} = props;

	useEffect(()=>{
		Jobs.loadTaskList(setTaskList, props.route.params.folderData._id);
	},[])

	const taskAddInputs = useInputs({
		content:'',
	});

	const onPressTaskListItem=()=>{
	}
	const onPressTaskAdd = async ()=>{
		const addResult = await Jobs.insertTaskList(setTaskList, taskAddInputs.content, folderData._id);
		if(addResult) 
			taskAddInputs.setInput('content', '');
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


	const renderItem = ({ item })=>{
		return (
			<TouchableOpacity style={styles.taskListItem} onPress={onPressTaskListItem}>
				<Text style={styles.taskListItemText}>{item.content}</Text>
			</TouchableOpacity>
		);
	}
	return(
		<Container hasBack={true} hasBackNoPadding={true} {...props} style={styles.container}>
			<Animated.Text style={{...styles.taskListTitle, opacity:taskListTitleOpacity,}}>{folderData.title}</Animated.Text>
			
			<FlatList
				style={styles.taskList}
				contentContainerStyle={styles.taskListContainer}
				data={taskList}
				renderItem={renderItem}
				keyExtractor={item=>item._id}
				onScroll={handleTaskListScroll}
			/>
			<View style={styles.taskAddContainer}>
				<InputCircle placeholder="새 태스크" style={styles.taskAddInput} {...taskAddInputs.inputProps('content')} />
				<TouchableOpacity onPress={onPressTaskAdd} style={styles.taskAddButton}><Icons name="chevron-forward-outline" size={20} style={styles.taskAddButtonIcon}/></TouchableOpacity>
			</View>
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

	taskAddContainer:{
		flexDirection:'row',
		width:'100%',
		padding:15,
		alignItems:'center',
	},
	taskAddInput:{
		flex:1,
		paddingVertical:5,
	},
	taskAddButton:{
		marginLeft:15,
	},
	taskAddButtonIcon:{
		height:30,
		width:30,
		backgroundColor:'#ddd',
		textAlign:'center',
		textAlignVertical:'center',
		borderRadius:30,
	}
});

export default TaskListScreen;