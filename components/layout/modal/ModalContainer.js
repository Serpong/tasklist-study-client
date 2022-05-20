import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

const ModalContainer = (props)=>{
	
	return (
		<View style={styles.modalContainer}>
			<View style={styles.modalWrapper}>
				{props.headerTitle&&<Text style={styles.modalHeader}>{props.headerTitle}</Text>}
				<View style={styles.modalContent}>
					{props.children}
				</View>

			</View>
			<View style={styles.modalBg}/>
		</View>
	)
}

const styles = StyleSheet.create({
	modalContainer:{
		position:'absolute',
		top:0,
		left:0,
		width:'100%',
		height:'100%',
		zIndex:1000000,
		justifyContent:'center',
		alignItems:'center',
	},
	modalBg:{
		position:'absolute',
		top:0,
		left:0,
		width:'100%',
		height:'100%',
		zIndex:1,
		backgroundColor:'#000',
		opacity:0.05,
	},
	modalWrapper:{
		zIndex:2,
		backgroundColor:"#fff",
		borderWidth:1,
		borderColor:'#ddd',
		borderRadius:15,
		elevation:20,
		minWidth:200,
		overflow:'hidden',
	},
	modalHeader:{
		textAlign:'center',
		padding:15,
		borderBottomColor:'#eee',
		backgroundColor:'#d77',
		color:'#fff',
		borderBottomWidth: 1,
		fontWeight:'700',
		fontSize:16,
	},
	modalContent:{

	},
});

export default ModalContainer;