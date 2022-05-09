import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import Container from '../../components/layout/Container';

const SignUpScreen = (props)=>{
	return(
		<Container hasBack={true} {...props}>
			<Text>Sign Up</Text>
		</Container>
	)
}

const styles = StyleSheet.create({
});

export default SignUpScreen;