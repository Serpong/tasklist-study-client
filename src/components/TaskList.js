import React, { useEffect, useRef, useState } from 'react';

import {StyleSheet, FlatList, Text, Alert, Dimensions} from 'react-native';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Apis from '@src/utils/Apis';
import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, interpolateColor, withTiming, interpolate, Extrapolate, runOnJS, withSequence, withRepeat} from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Ionicons';

const Jobs = {
	loadTaskList : async (setTaskList, folder_id, refreshing)=>{
		refreshing = true;
		const apiResult = await Apis.getTaskList({folder_id});
		refreshing = false;
		if(apiResult.error){
			Alert.alert("오류", apiResult.error.msg);
			return false;
		}
		setTaskList(Object.keys(apiResult.data).map(key=>(apiResult.data[key])));
		return true;
	},
	deleteTask: async (setTaskList, task_id)=>{
		const apiResult = await Apis.deleteTask({task_id});
		if(apiResult.error){
			Alert.alert("오류", apiResult.error.msg);
			return false;
		}
		setTaskList(taskList => taskList.filter(item=>(item._id != task_id)));
		return true;
	},
}


const DELETE_THRESH = -60;
const DEVICE_WIDTH = Dimensions.get('window').width;


const Item = ({onPressTaskListItem, setTaskList, item, ...props})=>{
	const _touchX = useSharedValue(0);
	const deleting = useSharedValue(0);
	
	const SHAKE_VALUE = useSharedValue(0.5);
	
	const testvalue = useSharedValue(true);
	
	
	const itemAnimatedStyle = useAnimatedStyle(()=>{
		return {
			transform:[{
				translateX: _touchX.value,
			}],
			backgroundColor:interpolateColor(
				_touchX.value,
				[DELETE_THRESH, DELETE_THRESH+1, -10],
				['#f33', '#faa', '#fff'],
			),
			height:interpolate(
				deleting.value,
				[0, 100],
				[50, 0],
			)
		};
	});
	
	const iconAnimatedStyle = useAnimatedStyle(()=>{
		return {
			opacity: deleting.value?(
				interpolate(
					deleting.value,
					[0,100],
					[1,0],
					Extrapolate.CLAMP
				)
			):(
				interpolate(
					_touchX.value,
					[DELETE_THRESH+1, DELETE_THRESH],
					[0.2, 1],
					Extrapolate.CLAMP
				)
			),
			transform:[
				{
					scale:interpolate(
						_touchX.value,
						[-20, DELETE_THRESH],
						[0, 1],
						Extrapolate.CLAMP
					)
				},
				{
					rotate:  `${interpolate(SHAKE_VALUE.value, [0, 1], [-20, 20])}deg`,
				}
			],
		};
	});

	const onItemPanGesture = useAnimatedGestureHandler({
		onStart:()=>{
		},
		onActive:(e)=>{
			_touchX.value = Math.min(e.translationX ?? 0, 0);
			if(testvalue.value == true && _touchX.value < DELETE_THRESH){
				SHAKE_VALUE.value = withRepeat(withSequence(withTiming(0), withTiming(1)), -1, true);
				testvalue.value = false;
			}
			else if(testvalue.value == false && _touchX.value >= DELETE_THRESH){
				SHAKE_VALUE.value = 0.5;
				testvalue.value = true;
			}
		},
		onEnd: ()=>{
			if(_touchX.value <= DELETE_THRESH){
				_touchX.value = withTiming(-DEVICE_WIDTH, {}, ()=>{
					deleting.value = withTiming(100, {}, ()=>{
						runOnJS(Jobs.deleteTask)(setTaskList, item._id);
					});
				});
			}
			else
				_touchX.value = withTiming(0);
		}
	})
	
	return (
		<>
			<PanGestureHandler onGestureEvent={onItemPanGesture} failOffsetX={5} activeOffsetX={-5} >
				<Animated.View style={[styles.taskListItem, itemAnimatedStyle]}>
					<TouchableOpacity onPress={onPressTaskListItem} style={styles.taskListItemInner}>
						<Text style={styles.taskListItemText}>{item.content}</Text>
					</TouchableOpacity>
				</Animated.View>
			</PanGestureHandler>
			<Animated.View style={[styles.taskListItemDeleteIcon, iconAnimatedStyle]} >
				<Icon name="trash-outline" size={30} color='#f00'/>
			</Animated.View>
		</>
	);
}
const TaskList = ({taskList, setTaskList, folder_id, handleTaskListScroll, showEditTask, ...props})=>{

	const refreshing = useRef(false).current;

	useEffect(()=>{
		Jobs.loadTaskList(setTaskList, folder_id, refreshing);
	},[])


	const onPressTaskListItem = (_id)=>()=>{
		showEditTask(_id);
	}
	const renderItem = ({ item })=>{
		return <Item item={item} setTaskList={setTaskList} onPressTaskListItem={onPressTaskListItem(item._id)} />
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
			onRefresh={()=>{Jobs.loadTaskList(setTaskList, folder_id, refreshing);}}
		/>
	);
}



const styles = StyleSheet.create({
	taskList:{
		flex:1,
	},
	taskListContainer:{
		padding:15,
		paddingTop:60,
	},
	taskListItem:{
		backgroundColor:'#fff',
		elevation:7,
		shadowColor:'#777',
		borderWidth:1,
		borderRadius:5,
		borderColor:'#eee',
		marginVertical:7,
		marginHorizontal:10,
		zIndex:2,
		height:50,
	},
	taskListItemInner:{
		height:'100%',
		justifyContent:'center',
		paddingHorizontal:15,
	},
	taskListItemText:{
		color:'#000',
	},
	taskListItemDeleteIcon:{
		position:'absolute',
		top:0,
		right:10,
		height:'100%',
		width:50,
		alignItems:'center',
		justifyContent:'center',
		zIndex:1,
	},
});

export default TaskList;