import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { ModalBottom, ModalBottomButton, ModalBottomSpacer } from './ModalComponents';

const ModalYesNo = ({onModalCancel, onPressYes, onPressNo, YesTitle, NoTitle, ...props})=>{
	return (
		<>
			{props.children}
			<ModalBottom style={styles.modalBottom}>
				<ModalBottomButton style={styles.ButtonYes} onPress={onPressYes} title={YesTitle??"확인"} />
				<ModalBottomSpacer />
				<ModalBottomButton style={styles.ButtonNo} onPress={onPressNo ?? onModalCancel} title={NoTitle??"취소"} />
			</ModalBottom>
		</>
	)
}

const styles = StyleSheet.create({
	modalBottom:{
		flexDirection:'row',
		borderTopWidth:1,
		borderTopColor:'#eee'
	},
	ButtonYes:{
	},
	ButtonNo:{
	}
});

export default ModalYesNo;