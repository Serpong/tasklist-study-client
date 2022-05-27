import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import GLOBALS from '@src/Globals';


const Input = {
	Primary: (props)=>{
		const [isFocused, setIsFocused] = useState(false);

		return(
			<TextInput
				{...props}
				style={[styles.input, styles.inputPrimary, (isFocused&&styles.inputFocused), props.style, ]}
				onFocus={()=>setIsFocused(true)}
				onBlur={()=>setIsFocused(false)}
			/>
		)
	},
	Circle: (props)=>{
		const [isFocused, setIsFocused] = useState(false);

		return(
			<TextInput
				{...props}
				style={[styles.input, styles.inputCircle, (isFocused&&styles.inputFocused), props.style, ]}
				onFocus={()=>setIsFocused(true)}
				onBlur={()=>setIsFocused(false)}
			/>
		)
	},
};


const styles = StyleSheet.create({
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
});

export default Input;