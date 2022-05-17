import React from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container } from '../../components/layout/Components';


const FolderListScreen = (props)=>{
	const {navigation} = props;
	const data = [
		{id:1, title:"title", writer:"me"},
		{id:2, title:"asdf", writer:"hongkildong"},
		{id:3, title:"ssss", writer:"heller"},
		{id:4, title:"fdg33", writer:"Lee"},
		{id:6, title:"sa", writer:"Kim"},
		{id:7, title:"title", writer:"hongkildong"},
	];

	const onPressFolderListItem = ()=>{
		navigation.navigate('taskList');
	};

	const renderItem = ({ item })=>{
		return (
			<TouchableOpacity style={styles.folderListItem} onPress={onPressFolderListItem}>
				<Text style={styles.folderListItemText}>{item.title}</Text>
			</TouchableOpacity>
		);
	}

	return(
		<Container {...props} style={styles.container}>
			<FlatList
				style={styles.folderList}
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
	folderList:{
		flex:1,
		paddingHorizontal:15,
	},
	folderListItem:{
		backgroundColor: '#50a14f',
		padding:5,
		paddingVertical:70,
		marginVertical:10,
	},
	folderListItemText:{
		color:'#fff',
	}
});

export default FolderListScreen;