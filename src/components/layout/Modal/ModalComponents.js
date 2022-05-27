import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import GLOBALS from '@src/Globals';

const ModalBottom = ({style, children, ...props})=>{
	return (
		<>
			<View style={[styles.modalBottom, style]}>
				{children}
			</View>
		</>
	)
};

const ModalBottomButton = ({title, onPress, style, textStyle, ...props})=>(
	<TouchableOpacity style={[styles.modalBottomButton, style]} onPress={onPress}>
		<Text style={[styles.modalBottomButtonText, textStyle]}>{title}</Text>
	</TouchableOpacity>
);

const ModalBottomSpacer = ({style, ...props})=>(
	<View style={[styles.modalBottomSpacer, style]} />
);

const styles = StyleSheet.create({
	modalBottom:{
		flexDirection:'row',
		minHeight:60,
		alignItems:'center',
		justifyContent:'flex-end',
		paddingHorizontal:15,
	},
	modalBottomSpacer:{
		width:1,
		backgroundColor:'#eee',
	},
	modalBottomButton:{
		minWidth:50,
		borderRadius:50,
		// borderWidth:1,
		borderColor:'#eee',
		marginRight:5,
		paddingVertical:7,
		paddingHorizontal:15,
	},
	modalBottomButtonText:{
		fontSize:11,
		fontWeight:'bold',
		color:GLOBALS.COLORS.PRIMARY,
		textAlign:'center',
		textAlignVertical:'center',
	}
});

export {ModalBottom, ModalBottomButton, ModalBottomSpacer};