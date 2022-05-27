import React from 'react';
import { StyleSheet, View } from 'react-native';

import CustomBack from '@src/components/layout/CustomBack';


const Container = ({hasBack, hasBackNoPadding, navigation, ...props})=>{
	const newPaddingTop = (
		(
			props.style?
				(props.style.paddingTop??props.style.padding??props.style.paddingVertical??0)
			:
				(0)
		)
		+
		(hasBack&&!hasBackNoPadding?60:0)
	);
	return(
		<View style={{...props.style, ...styles.container, paddingTop:newPaddingTop}}>
			{hasBack && <CustomBack navigation={navigation} />}
			{props.children}
		</View>
	)
}



const styles = StyleSheet.create({
	container:{
		flex:1,
	},
});


export default Container;
