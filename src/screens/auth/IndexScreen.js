import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Btn, Container } from '@src/components/common/index';
import GLOBALS from '@src/Globals';


const Index = ({navigation, ...props})=>{
	return(
		<Container style={styles.indexContainer} navigation={navigation}>
			<View>
				<Text style={styles.text1}>Welcome</Text>
				<Text style={styles.text2}>Easiest way{'\n'}Manage your tasks</Text>
				<Btn.Secondary title="Login" onPress={()=>{navigation.navigate("Login")}} />
				<Btn.BorderSecondary title="Sign Up" onPress={()=>{navigation.navigate("SignUp")}} />
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	indexContainer:{
		padding:20,
		backgroundColor:GLOBALS.COLORS.PRIMARY,
		justifyContent:'center',

	},
	text1:{
		color:'#fff',
		fontSize:40,
		fontWeight:'bold',
		marginBottom:'5%',
	},
	text2:{
		color:'#fff',
		fontSize:20,
		marginBottom:'15%',
	},
});

export default Index;