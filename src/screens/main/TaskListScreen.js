import React, { useState, useRef, useEffect } from 'react';

import { Alert, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Btn, Container, Input } from '@src/components/common/index';
import Apis from '@src/utils/Apis';
import Animated from 'react-native-reanimated';

import Modal from '@src/components/layout/Modal';
import TaskList from '@src/components/TaskList';
import TaskAdd from '@src/components/TaskAdd';
import { useInputs } from '@src/utils/componentUtils';

const TaskListScreen = (props)=>{
	const [taskList, setTaskList] = useState([]);
	const [showEditTaskModal, setShowEditTaskModal] = useState(false);
	const [task_id, setTask_id] = useState('');
	const modalInputs = useInputs({
		content:'',
	});

	const {route:{params:{folderData}}} = props;

	
	const scrollY = useRef(new Animated.Value(1)).current;
	const taskListTitleOpacity = scrollY.interpolate({
		inputRange: [10, 25, 40],
		outputRange: [1, 0.2, 0],
		extrapolate: 'clamp',
	})
	const handleTaskListScroll = (e)=>{
		scrollY.setValue(e.nativeEvent.contentOffset.y);
	}

	const showEditTask = (task_id)=>{
		setTask_id(task_id);
		const this_task = taskList.find(item=>item._id==task_id);
		if(!this_task) 
			return Alert.alert('오류', '존재하지 않는 태스크입니다.');
		modalInputs.setInput('content', this_task.content);
		setShowEditTaskModal(true);
	}
	const onPressEditTask = async ()=>{
		const apiResult = await Apis.editTask({content: modalInputs.content, task_id});
		if(apiResult.error) return Alert.alert("오류", apiResult.error.msg);
		

		setTaskList(taskList=>taskList.map(item=>{
			if(item._id == apiResult.data._id)
				item.content = apiResult.data.content;
			return item;
		}));
		
		setShowEditTaskModal(false);
	}

	
	return(
		<Container hasBack={true} hasBackNoPadding={true} {...props} style={styles.container}>
			<Modal
				wrapperType="YesNo"
				wrapperProps={{
					onPressYes: onPressEditTask,
					YesTitle:"수정",
				}}
				headerTitle="태스크 수정"
				showModal={showEditTaskModal}
				setShowModal={setShowEditTaskModal}
			>
				<View style={{paddingHorizontal:20,}}>
					<Input.Circle
						placeholder='태스크 명'
						{...modalInputs.inputProps('content')}
					/>
				</View>
			</Modal>

			<Animated.Text style={{...styles.taskListTitle, opacity:taskListTitleOpacity,}}>{folderData.title}</Animated.Text>
			
			<TaskList
				taskList={taskList}
				setTaskList={setTaskList}
				folder_id={props.route.params.folderData._id}
				handleTaskListScroll={handleTaskListScroll}
				showEditTask={showEditTask}
			/>
			<TaskAdd
				taskList={taskList}
				setTaskList={setTaskList}
				folder_id={props.route.params.folderData._id}
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

});

export default TaskListScreen;