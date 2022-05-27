import React from 'react';

import Icons from 'react-native-vector-icons/Ionicons';

import { Alert, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useInputs } from '@src/utils/componentUtils';
import { Input } from '@src/components/common/index';
import Apis from '@src/utils/Apis';

const Jobs = {
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

const TaskAdd = ({taskList, setTaskList, folder_id, ...props})=>{
	

	const taskAddInputs = useInputs({
		content:'',
	});
	const onPressTaskAdd = async ()=>{
		const addResult = await Jobs.insertTaskList(setTaskList, taskAddInputs.content, folder_id);
		if(addResult) 
			taskAddInputs.setInput('content', '');
	}


	return (
		<View style={styles.taskAddContainer}>
			<Input.Circle placeholder="새 태스크" style={styles.taskAddInput} {...taskAddInputs.inputProps('content')} />
			<TouchableOpacity onPress={onPressTaskAdd} style={styles.taskAddButton}><Icons name="chevron-forward-outline" size={20} style={styles.taskAddButtonIcon}/></TouchableOpacity>
		</View>
	);
}



const styles = StyleSheet.create({
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

export default TaskAdd;