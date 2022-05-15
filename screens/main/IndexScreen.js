import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Container from '../../components/layout/Container';
import { BtnBorder, BtnSecondary } from '../../components/layout/Components';


const Index = (props)=>{
	return(
		<Container {...props} style={{backgroundColor:'#3cc5b1',}}>
			<View style={styles.indexContainer}>
				<Text>Welcome</Text>
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
});

export default Index;