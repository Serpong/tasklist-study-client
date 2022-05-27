import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomBack from '@src/components/layout/CustomBack';
import GLOBALS from '@src/Globals';


const Container = ({hasBack, hasBackNoPadding, navigation, ...props})=>{
	const newPaddingTop = (
		(
			props.style?
				(props.style.paddingTop??props.style.padding??props.style.paddingVertical??0)
			:
				(0)
		)
		+
		(hasBack&&!hasBackNoPadding?60:0)
	);
	return(
		<View style={{...props.style, ...styles.container, paddingTop:newPaddingTop}}>
			{hasBack && <CustomBack navigation={navigation} />}
			{props.children}
		</View>
	)
}

const BtnPrimary = ({title, ...props})=>{
	return(
		<TouchableOpacity {...props}>
			<Text style={{...styles.btn, ...styles.btnPrimary, ...props.style, }}>{title}</Text>
		</TouchableOpacity>
	)
}
const BtnSecondary = ({title, ...props})=>{
	return(
		<TouchableOpacity {...props}>
			<Text style={{...styles.btn, ...styles.btnSecondary, ...props.style, }}>{title}</Text>
		</TouchableOpacity>
	)
}
const BtnBorder = ({title, ...props})=>{
	return(
		<TouchableOpacity {...props}>
			<Text style={{...styles.btn, ...styles.btnBorder, ...props.style, }}>{title}</Text>
		</TouchableOpacity>
	)
}
const InputPrimary = (props)=>{
	const [isFocused, setIsFocused] = useState(false);

	return(
		<TextInput
			{...props}
			style={[styles.input, styles.inputPrimary, (isFocused&&styles.inputFocused), props.style, ]}
			onFocus={()=>setIsFocused(true)}
			onBlur={()=>setIsFocused(false)}
		/>
	)
}

const InputCircle = (props)=>{
	const [isFocused, setIsFocused] = useState(false);

	return(
		<TextInput
			{...props}
			style={[styles.input, styles.inputCircle, (isFocused&&styles.inputFocused), props.style, ]}
			onFocus={()=>setIsFocused(true)}
			onBlur={()=>setIsFocused(false)}
		/>
	)
}
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
			{ (title==undefined || title != '')&&
				<Text style={styles.imagePickerTitle}>{props.title ?? "이미지 업로드"}</Text>
			}
			{assets.fileName&&<Text numberOfLines={1} style={styles.imagePickerFileName}>{assets.fileName}</Text>}
			<View style={styles.imagePickerBtns}>
				<BtnPrimary title="카메라" onPress={onPressCamera} style={styles.imagePickerButton}/>
				<BtnPrimary title="갤러리" onPress={onPressGallery} style={styles.imagePickerButton}/>
			</View>
		</View>
	);

}
const ImagePicker = {
	camera: props =>{
		return ImagePickerTemplate(props);
	},
	gallery: (props)=>{
		return (
			<ImagePickerTemplate>
			</ImagePickerTemplate>
		);
	},
	both: (props)=>{
		return (
			<ImagePickerTemplate>
			</ImagePickerTemplate>
		);
	},
}

const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	btn:{
		borderRadius:100,
		height:40,
		justifyContent:'center',
		textAlign:'center',
		textAlignVertical:'center',
		borderWidth:1,
		borderColor:'#fff',
		marginVertical:5,
	},
	btnPrimary:{
		backgroundColor: GLOBALS.COLORS.PRIMARY,
		color:'#fff',
	},
	btnSecondary:{
		backgroundColor:'#fff',
		color: GLOBALS.COLORS.PRIMARY,
	},
	btnBorder:{
		color:'#fff',
	},

	input:{
		borderColor:'#ddd',
	},
	inputFocused:{
		borderColor: GLOBALS.COLORS.PRIMARY,
	},
	inputPrimary:{
		borderBottomWidth:2,
	},
	inputCircle:{
		borderWidth:1,
		borderRadius:100,
		paddingVertical:3,
		paddingHorizontal:15,
		fontSize:12,
	},

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
		marginLeft:5,
		fontSize:12,
	},
});

export {
	Container,
	BtnPrimary,
	BtnSecondary,
	BtnBorder,
	InputPrimary,
	InputCircle,
	ImagePicker,
};