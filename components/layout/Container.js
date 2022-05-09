import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import CustomBack from '../../components/layout/CustomBack';

const Container = (props)=>{
	// const { hasBack, children, navigation, style } = props;
	return(
		<View style={{...props.style, ...styles.container, ...(props.hasBack?{paddingTop:50,}:{})}}>
			{props.hasBack && <CustomBack navigation={props.navigation} />}
			{props.children}
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
	}
});

export default Container;