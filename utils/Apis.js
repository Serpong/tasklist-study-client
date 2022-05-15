import React from 'react'
import axios from 'axios';

const API_HOST = "http://192.168.0.3:3000";

const apiRequest = async (path, data)=>{
	let result = {};
	await axios({
		method	:'post',
		url		: API_HOST+path,
		data	: data
	})
	.then(response=>{
		result = response.data;
	})
	.catch(error=>{
		result = {error: error.response.data.error??{msg:"비정상적인 오류입니다."}};
	});

	return result;
}

const Apis = {
	login: async ({userId, userPass})=>{
		const result = await apiRequest("/auth/user-login", {userId, userPass});
		return result;
	}
}

export default Apis;