import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

const ModalContainer = ({headerTitle, children,...props})=>{
	
	return (
		<View style={styles.modalContainer}>
			<View style={styles.modalWrapper}>
				{headerTitle&&<Text style={styles.modalHeader}>{headerTitle}</Text>}
				<View style={styles.modalContent}>
					{children}
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
		// borderWidth:1,
		// borderColor:'#ddd',
		borderRadius:15,
		elevation:20,
		minWidth:200,
		overflow:'hidden',
	},
	modalHeader:{
		// textAlign:'center',
		// borderBottomColor:'#eee',
		// backgroundColor:'#ff0545',
		// color:'#fff',
		// borderBottomWidth: 1,
		padding:20,
		// paddingHorizontal:20,
		color:'#333',
		fontWeight:'700',
		fontSize:14,
	},
	modalContent:{

	},
});

export default ModalContainer;