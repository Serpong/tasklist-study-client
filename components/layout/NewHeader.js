import React from 'react';

import Icons from 'react-native-vector-icons/Ionicons';

import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';


const NewHeader = ({navigation, route, ...props})=>{
	return (
		<View style={styles.newHeader}>
			<View style={styles.headerLeft}>
				<TouchableOpacity onPress={()=>{navigation.goBack();}} style={styles.btnHeaderBack} >
					<Icons name="chevron-back-outline" size={20} />
				</TouchableOpacity>
			</View>
			<View style={styles.headerCenter}>
				<Text style={styles.headerLabel}>{route.name}</Text>
			</View>
			<View style={styles.headerRight}>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	newHeader:{
		height:50,
		backgroundColor:'white',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		paddingHorizontal:10,
	},
	headerLeft:{ flex:1, },
	headerCenter:{ flex:1, },
	headerRight:{ flex:1, },
	btnHeaderBack:{
		width:30,
		height:30,
		// backgroundColor:'red',
		justifyContent:'center',
		alignItems:'center',
	},
	headerLabel:{
		textAlign:'center',
	}
});


export default NewHeader;