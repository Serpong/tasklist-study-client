import React, { useState } from 'react';

import { StyleSheet, View, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Container, BtnPrimary, InputPrimary } from '../../components/layout/Components';
import { userSetLogin } from '../../reducers/userReducer';
import Apis from '../../utils/Apis';
import { useInputs } from '../../utils/componentUtils';


const SignUpScreen = ({...props})=>{
	const dispatch = useDispatch();

	const signUpInputs = useInputs({
		userId:"",
		userPass:"",
		userPassCheck:"",
		userName:"",
	});
	
	const onSignUp = async ()=>{
		if(signUpInputs.userPass != signUpInputs.userPassCheck)
			return Alert.alert("오류", "패스워드 확인이 틀립니다.");

		const registerResponse = await Apis.register({
			userId	:signUpInputs.userId,
			userPass:signUpInputs.userPass,
			userName:signUpInputs.userName,
		})
		if(registerResponse.error)
			return Alert.alert("오류", registerResponse.error.msg);

		const loginResponse = await Apis.login({
			userId	:signUpInputs.userId,
			userPass:signUpInputs.userPass,
		})
		if(loginResponse.error)
			return Alert.alert("오류", loginResponse.error.msg);
			
		Alert.alert("회원가입", "회원가입이 완료되었습니다.");
		dispatch(userSetLogin());
	}

	return(
		<Container hasBack={true} style={styles.signUpContainer} {...props}>
			<Text style={styles.signUpTitle}>Sign Up</Text>
			<InputPrimary
				placeholder='ID'
				{...signUpInputs.inputProps('userId')}
			/>
			<InputPrimary
				placeholder='name'
				{...signUpInputs.inputProps('userName')}
			/>
			<InputPrimary
				placeholder='Password'
				textContentType="password"
				secureTextEntry
				{...signUpInputs.inputProps('userPass')}
			/>
			<InputPrimary
				placeholder='Password check'
				textContentType="password"
				secureTextEntry
				{...signUpInputs.inputProps('userPassCheck')}
			/>
			<BtnPrimary
				title="Sign Up"
				style={{marginTop:15,}}
				onPress={onSignUp}
			/>
		</Container>
	)
}

const styles = StyleSheet.create({
	signUpContainer:{
		paddingHorizontal:20,
		justifyContent:'center',
	},
	signUpTitle:{
		fontSize:20,
		fontWeight:'bold',
		color:'#333333',
		marginTop:-60,
		marginBottom:20,
	}
});

export default SignUpScreen;