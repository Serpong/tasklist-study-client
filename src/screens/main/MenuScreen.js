import React from 'react';

import { View, Text, StyleSheet, Alert } from 'react-native';
import { Btn, Container } from '@src/components/common/index';
import { useDispatch } from 'react-redux';
import Apis from '@src/utils/Apis';
import { userSetLogout } from '@src/reducers/userReducer';
import GLOBALS from '@src/Globals';


const MenuScreen = (props)=>{
	const dispatch = useDispatch();

	const onLogout = ()=>{
		Apis.logout().then(response=>{
			if(response.error)
				Alert.alert("오류", response.error.msg);
			else{
				Alert.alert("로그아웃", response.msg);
				dispatch(userSetLogout());
			}
		});
	}
	return(
		<Container {...props} style={{backgroundColor:GLOBALS.COLORS.PRIMARY,}}>
			<View style={styles.indexContainer}>
				<Btn.BorderSecondary title="로그아웃" onPress={onLogout} />
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	indexContainer:{
		padding:15,
	},
});

export default MenuScreen;