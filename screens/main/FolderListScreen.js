import React, { useEffect, useState } from 'react';

import { Alert, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container, InputPrimary } from '../../components/layout/Components';

import Apis from '../../utils/Apis';

import { useDispatch, useSelector } from 'react-redux';
// import { modalNew, modalRemove } from '../../reducers/modalReducer';
import Modal from '../../components/layout/Modal';
import { useInputs } from '../../utils/componentUtils';

const FolderListScreen = (props)=>{
	const {navigation} = props;

	const dispatch = useDispatch();
	
	const [folderList, setFolderList] = useState([]);
	
	useEffect(() => {
		Apis.getFolderList()
			.then(apiResult=>{
				if(apiResult.error)
					Alert.alert("오류", apiResult.error.msg);
				else{
					setFolderList(Object.keys(apiResult.data).map(key=>({...apiResult.data[key], _id:key})));
				}
			})
			.catch(err=>{
				console.log('error: ', err);
			});
	}, [])
	


	const onPressFolderListItem = (folderData)=>()=>{
		navigation.push('taskList', {folderData});
	};
	
	
	
	
	const modalInputs = useInputs({
		folderName:"",
	});

	const [showAddFolderModal, setShowAddFolderModal] = useState(false);

	const addFolderHandler = ()=>{
		setShowAddFolderModal(true);
		modalInputs.setInput('folderName', '');
	}


	const renderItem = ({ item })=>(
		(item._id=='btnAddFolder')?(
			<TouchableOpacity style={styles.folderListItem} onPress={addFolderHandler}>
				<Text style={styles.folderListItemText}>{item.title}</Text>
			</TouchableOpacity>
		):(
			<TouchableOpacity style={styles.folderListItem} onPress={onPressFolderListItem(item)}>
				<Text style={styles.folderListItemText}>{item.title}</Text>
			</TouchableOpacity>
		)
		
	)

	return(
		<Container {...props} style={styles.container}>
			<Modal
				wrapperType="YesNo"
				wrapperProps={{
					onPressYes:()=>{
						console.log('pressedYes', modalInputs.folderName);
						setShowAddFolderModal(false);
					},
					YesTitle:"추가",
				}}
				headerTitle="모달 제목임"
				showModal={showAddFolderModal}
				setShowModal={setShowAddFolderModal}
			>
				<InputPrimary
					placeholder='폴더 명'
					{...modalInputs.inputProps('folderName')}
				/>
				<Text>내용임당</Text>
			</Modal>
			
			<FlatList
				style={styles.folderList}
				contentContainerStyle={styles.folderListContainer}
				data={[...folderList, {_id:'btnAddFolder', title:"폴더 추가"}]}
				renderItem={renderItem}
				keyExtractor={item=>item._id}
			/>
		</Container>
	)
}



const styles = StyleSheet.create({
	container:{
		backgroundColor:'#fff',
		flex:1,
	},
	folderList:{
		flex:1,
	},
	folderListContainer:{
		padding:15,
	},
	folderListItem:{
		backgroundColor: '#ddd',
		padding:5,
		paddingVertical:70,
		marginVertical:10,
	},
	folderListItemText:{
		textAlign:'center',
		color:'#000',
	}
});

export default FolderListScreen;