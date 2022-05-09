import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Container from '../../components/layout/Container';
import { BtnBorder, BtnPrimary, BtnSecondary, InputPrimary } from '../../components/layout/Components';

import Apis from '../../apis';

const LoginScreen = (props)=>{
	const { navigation } = props;

	const onLogin = ()=>{
		console.log('pressed');
		Apis.login();
	}

	return(
		<Container hasBack={true} {...props} style={{backgroundColor:'#fff',}}>
			<View style={styles.loginContainer}>
				<Text style={styles.text1}>Login</Text>
				<Text style={styles.text2}>Easiest way{'\n'}Manage your tasks</Text>
				<InputPrimary
					placeholder='ID'
				/>
				<InputPrimary
					placeholder='Password'
					textContentType="password"
					secureTextEntry
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