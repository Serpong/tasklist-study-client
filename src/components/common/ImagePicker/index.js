import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { Btn } from '../index';

const ImagePickerTemplate = ({title, assets, setAssets, ...props})=>{

	const onPressCamera = async ()=>{
		const result = await launchCamera();
		
		if(result.assets && result.assets[0])
			setAssets(result.assets[0])
	}

	const onPressGallery = async ()=>{
		const result = await launchImageLibrary();
		if(result.assets && result.assets[0])
			setAssets(result.assets[0])
	}

	return (
		<View style={styles.imagePickerContainer}>
			<Text style={styles.imagePickerTitle}>{title ?? "이미지 업로드"}</Text>
			{assets.fileName&&<Text numberOfLines={1} style={styles.imagePickerFileName}>{assets.fileName}</Text>}
			<View style={styles.imagePickerBtns}>
				<Btn.BorderPrimary title="카메라" onPress={onPressCamera} style={styles.imagePickerButton}/>
				<View style={{width:10}}></View>
				<Btn.BorderPrimary title="갤러리" onPress={onPressGallery} style={styles.imagePickerButton}/>
			</View>
		</View>
	);

}
const ImagePicker = {
	Camera: props =>{
		return ImagePickerTemplate(props);
	},
	Gallery: (props)=>{
		return ImagePickerTemplate(props);
	},
	Both: (props)=>{
		return ImagePickerTemplate(props);
	},
}




const styles = StyleSheet.create({
	imagePickerContainer:{
		marginTop:20,
	},
	imagePickerTitle:{
		fontSize:12,
		fontWeight:'700',
		color:'#555',
	},
	imagePickerFileName:{
		maxWidth:200,
	},
	imagePickerBtns:{
		flexDirection:'row',
		height:40,
	},
	imagePickerButton:{
		flex:1,
		fontSize:12,
	},
});

export default ImagePicker;