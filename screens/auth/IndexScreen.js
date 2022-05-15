import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { BtnBorder, BtnSecondary, Container } from '../../components/layout/Components';


const Index = (props)=>{
	const { navigation } = props;
	return(
		<Container {...props} style={{backgroundColor:'#3cc5b1',}}>
			<View style={styles.indexContainer}>
				<Text style={styles.text1}>Welcome</Text>
				<Text style={styles.text2}>Easiest way{'\n'}Manage your tasks</Text>
				<BtnSecondary title="Login" onPress={()=>{navigation.navigate("Login")}} />
				<BtnBorder title="Sign Up" onPress={()=>{navigation.navigate("SignUp")}} />
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	indexContainer:{
		flex:1,
		justifyContent:'flex-end',
		padding:15,
		paddingBottom:'45%',
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