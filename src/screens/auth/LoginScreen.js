import React, {useState} from 'react';

import { View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { BtnBorder, BtnPrimary, BtnSecondary, Container, InputPrimary } from '@src/components/common';
import Apis from '@src/utils/Apis';
import { userSetLogin } from '@src/reducers/userReducer';
import { useInputs } from '@src/utils/componentUtils';


const LoginScreen = ({...props})=>{
	const dispatch = useDispatch();

	const loginInputs = useInputs({
		userId:"",
		userPass:"",
	})

	const onLogin = async ()=>{
		const apiResult = await Apis.login({
			userId	: loginInputs.userId,
			userPass: loginInputs.userPass
		});
		
		if(apiResult.error)
			Alert.alert("로그인 오류", apiResult.error.msg);
		else
			dispatch(userSetLogin());
	}

	return(
		<Container hasBack={true} {...props}>
			<View style={styles.loginContainer}>
				<Text style={styles.text1}>Login</Text>
				<Text style={styles.text2}>Easiest way{'\n'}Manage your tasks</Text>
				<InputPrimary
					placeholder='ID'
					{...loginInputs.inputProps('userId')}
				/>
				<InputPrimary
					placeholder='Password'
					textContentType="password"
					secureTextEntry
					{...loginInputs.inputProps('userPass')}
				/>
				<BtnPrimary
					title="Login"
					style={{marginTop:15,}}
					onPress={()=>onLogin()}
				/>
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	loginContainer:{
		flex:1,
		padding:15,
	},
	text1:{
		color:'#555',
		fontSize:40,
		fontWeight:'bold',
		marginBottom:'5%',
	},
	text2:{
		color:'#555',
		fontSize:20,
		marginBottom:'15%',
	},
});

export default LoginScreen;