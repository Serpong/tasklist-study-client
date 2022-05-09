import React from 'react';

import { View, Text, Button } from 'react-native';


const Index = ({navigation})=>{
	return(
		<View>
			<Text>테스트</Text>
			<Button title="로그인하러가기" onPress={()=>{navigation.navigate("Login")}} />
		</View>
	)
}

export default Index;