import React from 'react';

import Icons from 'react-native-vector-icons/Ionicons';

import { StyleSheet, View, TouchableOpacity } from 'react-native';



const CustomBack = ({navigation, route, ...props})=>{
	return (
		<TouchableOpacity style={styles.customBack} onPress={()=>{navigation.goBack()}}>
			<Icons name="arrow-back-outline" size={20} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	customBack:{
		position:'absolute',
		top:10,
		left:10,
		width:40,
		height:40,
		// backgroundColor:'red',
		justifyContent:'center',
		alignItems:'center',
	},
});


export default CustomBack;