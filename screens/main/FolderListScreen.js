import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container } from '../../components/layout/Components';

import Apis from '../../utils/Apis';

import { useDispatch } from 'react-redux';
import { func1 } from '../../reducers/testReducer';


const FolderListScreen = (props)=>{
	const {navigation} = props;
	
	const [folderList, setFolderList] = useState([]);
	
	const dispatch = useDispatch();
	
	console.log(333, dispatch(func1(123)));

	useEffect(() => {
		Apis.getFolderList()
			.then(apiResult=>{
				if(apiResult.error)
					Alert.alert("로그인 오류", apiResult.error.msg);
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

	const renderItem = ({ item })=>(
		<TouchableOpacity style={styles.folderListItem} onPress={onPressFolderListItem(item)}>
			<Text style={styles.folderListItemText}>{item.title}</Text>
		</TouchableOpacity>
	)

	return(
		<Container {...props} style={styles.container}>
			<FlatList
				style={styles.folderList}
				contentContainerStyle={styles.folderListContainer}
				data={folderList}
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