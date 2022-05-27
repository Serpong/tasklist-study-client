import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { ModalBottom, ModalBottomButton, ModalBottomSpacer } from './ModalComponents';
import GLOBALS from '../../../Globals';

const YesNo = ({hideModal, onPressYes, onPressNo, YesTitle, NoTitle, ...props})=>{
	return (
		<>
			{props.children}
			<ModalBottom style={styles.modalBottom}>
				<ModalBottomButton style={styles.ButtonSecondary} textStyle={styles.ButtonSecondaryText} onPress={onPressNo ?? hideModal} title={NoTitle??"취소"} />
				<ModalBottomSpacer />
				<ModalBottomButton style={styles.ButtonPrimary} textStyle={styles.ButtonPrimaryText} onPress={onPressYes} title={YesTitle??"수락"} />
			</ModalBottom>
		</>
	)
}
const Ok = ({hideModal, onPressOk, okTitle, ...props})=>{
	return (
		<>
			{props.children}
			<ModalBottom style={styles.modalBottom}>
				<ModalBottomButton style={styles.ButtonPrimary} textStyle={styles.ButtonPrimaryText} onPress={onPressOk ?? hideModal} title={OkTitle??"확인"} />
			</ModalBottom>
		</>
	)
}

const styles = StyleSheet.create({
	modalBottom: { },
	ButtonPrimary: { backgroundColor:GLOBALS.COLORS.PRIMARY, },
	ButtonPrimaryText: { color:'#fff', },
	ButtonSecondary: { },
	ButtonSecondaryText: { },
});

export default { YesNo, Ok, };