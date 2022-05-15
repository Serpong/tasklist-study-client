import React from 'react';

import { View, Text, StyleSheet, Alert } from 'react-native';
import { BtnBorder, BtnSecondary, Container } from '../../components/layout/Components';
import { useDispatch } from 'react-redux';
import Apis from '../../utils/Apis';
import { userSetLogout } from '../../reducers/userReducer';


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
		<Container {...props} style={{backgroundColor:'#3cc5b1',}}>
			<View style={styles.indexContainer}>
				<Text>Welcome</Text>
				<BtnBorder title="로그아웃" onPress={onLogout} />
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