import React from 'react'
import axios from 'axios';

const API_HOST = "http://192.168.0.3:3000";

const apiRequest = async (path, method, data)=>{
	let result = {};
	await axios({
		method	: method,
		url		: API_HOST+path,
		data	: data,
		timeout : 1000,
	})
	.then(response=>{
		result = response.data;
		result.error = false;
	})
	.catch(error=>{
		console.log('api error', error.response);
		result = {error: error.response.data.error??{msg:"비정상적인 오류입니다."}};
	});

	return result;
}

const Apis = {
	login: async ({userId, userPass})=>{
		return await apiRequest("/auth/user-login", "post", {userId, userPass});
	},
	register: async ({userId, userPass, userName})=>{
		return await apiRequest("/auth/user-register", "post", {userId, userPass, userName});
	},
	logout: async ()=>{
		return await apiRequest("/auth/user-logout", "post");
	},
	loginCheck: async ()=>{
		return await apiRequest("/auth/login-check", "get");
	},
	getFolderList: async ()=>{
		return await apiRequest("/folder", "get");
	},
	getTaskList: async ({folder_id})=>{
		return await apiRequest(`/folder/${folder_id}/tasks`, "get");
	},
}

export default Apis;