import React, { useEffect, useRef, useState } from 'react';

import {StyleSheet, FlatList, Text, Alert, } from 'react-native';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Apis from '../utils/Apis';
import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, interpolateColor} from 'react-native-reanimated';

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
const Item = ({onPressTaskListItem, item, ...props})=>{
	const _touchX = useSharedValue(0);
	// const _threshX = 720 / 4;
	
	const animatedStyle = useAnimatedStyle(()=>{
		return {
			transform:[{
				translateX: _touchX.value, //withSpring(_touchX.value, {damping:300}),
			}],
			backgroundColor:interpolateColor(
				Math.abs(_touchX.value),
				[30,100],
				['#fff', '#f77'],
			)
		};
	});

	const onItemPanGesture = useAnimatedGestureHandler({
		onStart:()=>{
		},
		onActive:(e)=>{
			_touchX.value = e.translationX ?? 0;
		},
		onEnd:()=>{
			_touchX.value = 0;
		}
	})
	
	return (
		<PanGestureHandler onGestureEvent={onItemPanGesture} activeOffsetX={[-5, 5]} >
			<Animated.View style={[styles.taskListItem, animatedStyle]}>
				<TouchableOpacity onPress={onPressTaskListItem} style={styles.taskListItemInner}>
					<Text style={styles.taskListItemText}>{item.content}</Text>
				</TouchableOpacity>
			</Animated.View>
		</PanGestureHandler>
	);
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
		return <Item item={item} onPressTaskListItem={onPressTaskListItem(item._id)} />
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
		backgroundColor:'#fff',
		borderWidth:1,
		borderColor:'#eee',
		marginVertical:10,
		borderRadius:5,
		elevation:7,
		shadowColor:'#777',
	},
	taskListItemInner:{
		flex:1,
		padding:15,
	},
	taskListItemText:{
		color:'#000',
	},
});

export default TaskList;