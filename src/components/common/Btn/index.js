import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import GLOBALS from '@src/Globals';

const Btn = {
	Primary:({title, ...props})=>{
		return(
			<TouchableOpacity {...props}>
				<Text style={{...styles.btn, ...styles.btnPrimary, ...props.style, }}>{title}</Text>
			</TouchableOpacity>
		)
	},
	Secondary:({title, ...props})=>{
		return(
			<TouchableOpacity {...props}>
				<Text style={{...styles.btn, ...styles.btnSecondary, ...props.style, }}>{title}</Text>
			</TouchableOpacity>
		)
	},
	BorderPrimary:({title, ...props})=>{
		return(
			<TouchableOpacity {...props}>
				<Text style={{...styles.btn, ...styles.btnBorderPrimary, ...props.style, }}>{title}</Text>
			</TouchableOpacity>
		)
	},
	BorderSecondary:({title, ...props})=>{
		return(
			<TouchableOpacity {...props}>
				<Text style={{...styles.btn, ...styles.btnBorderSecondary, ...props.style, }}>{title}</Text>
			</TouchableOpacity>
		)
	}
}


const styles = StyleSheet.create({
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
	btnBorderPrimary:{
		color: GLOBALS.COLORS.PRIMARY,
		borderColor: GLOBALS.COLORS.PRIMARY,
		borderWidth: 1,
	},
	btnBorderSecondary:{
		color:'#fff',
	},
});

export default Btn;