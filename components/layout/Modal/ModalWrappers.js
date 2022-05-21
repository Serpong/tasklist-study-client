import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { ModalBottom, ModalBottomButton, ModalBottomSpacer } from './ModalComponents';

const YesNo = ({hideModal, onPressYes, onPressNo, YesTitle, NoTitle, ...props})=>{
	return (
		<>
			{props.children}
			<ModalBottom style={styles.modalBottom}>
				<ModalBottomButton style={styles.ButtonYes} onPress={onPressYes} title={YesTitle??"수락"} />
				<ModalBottomSpacer />
				<ModalBottomButton style={styles.ButtonNo} onPress={onPressNo ?? hideModal} title={NoTitle??"취소"} />
			</ModalBottom>
		</>
	)
}
const Ok = ({hideModal, onPressOk, okTitle, ...props})=>{
	return (
		<>
			{props.children}
			<ModalBottom style={styles.modalBottom}>
				<ModalBottomButton style={styles.ButtonOk} onPress={onPressOk ?? hideModal} title={OkTitle??"확인"} />
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
	},
	ButtonOk:{
	},
});

export default { YesNo, Ok, };