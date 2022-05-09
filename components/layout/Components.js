import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';

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
	BtnPrimary,
	BtnSecondary,
	BtnBorder,
	InputPrimary,
};