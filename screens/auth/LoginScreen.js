import React, {useState} from 'react';

import { View, Text, StyleSheet, Alert } from 'react-native';
import Container from '../../components/layout/Container';
import { BtnBorder, BtnPrimary, BtnSecondary, InputPrimary } from '../../components/layout/Components';

import Apis from '../../utils/Apis';
import { useDispatch, useSelector } from 'react-redux';
import { userSetLogin } from '../../reducers/userReducer';


const LoginScreen = (props)=>{
	const dispatch = useDispatch();
	
	const { navigation } = props;

	const [inputId, 	setInputId] 	= useState('');
	const [inputPass, 	setInputPass] 	= useState('');

	const onChangeInput = (setter)=>(val)=>setter(val);

	const {isLoggedIn} = useSelector(state=>state.userReducer);
	console.log(isLoggedIn);

	const onLogin = async ()=>{
		const apiResult = await Apis.login({
			userId	: inputId,
			userPass: inputPass
		});

		if(apiResult.error){
			Alert.alert("로그인 오류", apiResult.error.msg);
		}
		else{
			dispatch(userSetLogin());
		}
	}

	return(
		<Container hasBack={true} {...props} style={{backgroundColor:'#fff',}}>
			<View style={styles.loginContainer}>
				<Text style={styles.text1}>Login{isLoggedIn}</Text>
				<Text style={styles.text2}>Easiest way{'\n'}Manage your tasks</Text>
				<InputPrimary
					placeholder='ID'
					value={inputId}
					onChangeText={onChangeInput(setInputId)}
				/>
				<InputPrimary
					placeholder='Password'
					textContentType="password"
					secureTextEntry
					value={inputPass}
					onChangeText={onChangeInput(setInputPass)}
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