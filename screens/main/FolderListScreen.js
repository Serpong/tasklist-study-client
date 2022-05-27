import React, { useEffect, useState } from 'react';

import { Alert, View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { ImagePicker, Container, InputCircle, InputPrimary } from '../../components/layout/Components';
import Apis from '../../utils/Apis';
import GLOBALS from '../../Globals';
import Modal from '../../components/layout/Modal';
import { useInputs } from '../../utils/componentUtils';


const Jobs = {
	loadFolderList: async (setFolderList)=>{
		const apiResult = await Apis.getFolderList();
		if(apiResult.error) return Alert.alert("오류", apiResult.error.msg);
		setFolderList(Object.keys(apiResult.data).map(key=>({...apiResult.data[key], _id:key})));
	},
	insertFolder: async (setFolderList, data)=>{
		const apiResult = await Apis.insertFolder(data);
		if(apiResult.error) return Alert.alert("오류", apiResult.error.msg);
		setFolderList(folderList=>([...folderList, apiResult.data]));
	},
}

const FolderListScreen = (props)=>{
	const {navigation} = props;
	
	const [folderList, setFolderList] = useState([]);

	const [showAddFolderModal, setShowAddFolderModal] = useState(false);

	const [folderUploadImage, setFolderUploadImage] = useState({});
	
	const modalInputs = useInputs({
		folderName:"",
	});

	useEffect(() => {
		Jobs.loadFolderList(setFolderList);
	}, [])

	const onPressFolderListItem = (folderData)=>()=>{
		navigation.push('taskList', {folderData});
	};

	const onPressAddFolder = async ()=>{
		setShowAddFolderModal(true);
		modalInputs.setInput('folderName', '');
	}
	const onPressInsertFolder = async ()=>{

		await Jobs.insertFolder(setFolderList, {
			folderName			: modalInputs.folderName,
			folderDescription	: '',
			folderThumb			: (folderUploadImage.fileName?{
				name	: folderUploadImage.fileName,
				type	: folderUploadImage.type, 
				uri		: folderUploadImage.uri,
			}:{}),
		});

		setShowAddFolderModal(false);
	}

	const renderItem = ({ item })=>(
		(item._id=='btnAddFolder')?(
			<TouchableOpacity style={[styles.folderListItem, styles.folderListItemBg]} onPress={onPressAddFolder}>
				<Text style={styles.folderListItemText}>{item.title}</Text>
			</TouchableOpacity>
		):(
			<TouchableOpacity style={styles.folderListItem} onPress={onPressFolderListItem(item)}>
				{<ImageBackground source={{uri:GLOBALS.API_HOST+item.thumbUrl}} style={styles.folderListItemBg}>
					<Text style={styles.folderListItemText}>{item.title}</Text>
				</ImageBackground>}
			</TouchableOpacity>
		)
	)

	return(
		<Container {...props} style={styles.container}>
			<Modal
				wrapperType="YesNo"
				wrapperProps={{
					onPressYes: onPressInsertFolder,
					YesTitle:"추가",	
				}}
				headerTitle="폴더 추가"
				showModal={showAddFolderModal}
				setShowModal={setShowAddFolderModal}
			>
				<View style={{paddingHorizontal:20,}}>
					<InputCircle
						placeholder='폴더 명'
						{...modalInputs.inputProps('folderName')}
					/>
					<ImagePicker.camera assets={folderUploadImage} setAssets={setFolderUploadImage} />
				</View>
			</Modal>
			
			<FlatList
				style={styles.folderList}
				contentContainerStyle={styles.folderListContainer}
				data={[...folderList, {_id:'btnAddFolder', title:"폴더 추가"}]}//todo 폴더추가를 아래로
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
		marginVertical:10,
		elevation:10,
	},
	folderListItemBg:{
		flex:1,
		padding:5,
		paddingVertical:70,
	},
	folderListItemText:{
		textAlign:'center',
		color:'#000',
	}
});

export default FolderListScreen;