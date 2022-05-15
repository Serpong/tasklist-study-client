import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import CustomBack from './CustomBack';



const Container = (props)=>{
	// const { hasBack, children, navigation, style } = props;
	return(
		<View style={{...props.style, ...styles.container, ...(props.hasBack?{paddingTop:50,}:{})}}>
			{props.hasBack && <CustomBack navigation={props.navigation} />}
			{props.children}
		</View>
	)
}

const BtnPrimary = (props)=>{
	return(
		<TouchableOpacity {...props}>
			<Text style={{...styles.btn, ...styles.btnPrimary, ...props.style, }}>{props.title}</Text>
		</TouchableOpacity>
	)
}
const BtnSecondary = (props)=>{
	return(
		<TouchableOpacity {...props}>
			<Text style={{...styles.btn, ...styles.btnSecondary, ...props.style, }}>{props.title}</Text>
		</TouchableOpacity>
	)
}
const BtnBorder = (props)=>{
	return(
		<TouchableOpacity {...props}>
			<Text style={{...styles.btn, ...styles.btnBorder, ...props.style, }}>{props.title}</Text>
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

const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	btn:{
		borderRadius:5,
		height:40,
		justifyContent:'center',
		textAlign:'center',
		textAlignVertical:'center',
		borderWidth:StyleSheet.hairlineWidth,
		borderColor:'#fff',
		marginVertical:5,
	},
	btnPrimary:{
		backgroundColor:'#17b7bd',
		color:'#fff',
	},
	btnSecondary:{
		backgroundColor:'#fff',
		color:'#17b7bd',
	},
	btnBorder:{
		color:'#fff',
	},

	input:{
		borderBottomWidth:2,
		borderBottomColor:'#ddd',
	},
	inputFocused:{
		borderBottomColor:'#17b7bd',
	}
});

export {
	Container,
	BtnPrimary,
	BtnSecondary,
	BtnBorder,
	InputPrimary,
};