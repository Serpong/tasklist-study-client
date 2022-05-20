import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';

const ModalBottom = ({style, ...props})=>{
	return (
		<>
			<View style={[styles.modalBottom, style]}>
				{props.children}
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
		borderTopWidth:1,
		borderTopColor:'#eee'
	},
	modalBottomSpacer:{
		width:1,
		backgroundColor:'#eee',
	},
	modalBottomButton:{
		flex:1,
	},
	modalBottomButtonText:{
		textAlign:'center',
		textAlignVertical:'center',
		paddingVertical:10,
	}
});

export {ModalBottom, ModalBottomButton, ModalBottomSpacer};