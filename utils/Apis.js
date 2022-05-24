import React from 'react'
import axios from 'axios';
import FormData from 'form-data';

const API_HOST = "http://192.168.0.3:3000";


const apiRequester = async({ path, method, data, headers,  })=>{
	
	let result = {};

	await axios({
		method	: method,
		url		: API_HOST+path,
		data	: data,
		timeout : 1000,
		headers : headers,
	})
	.then(response=>{
		result = response.data;
		// console.log(result);
		result.error = false;
	})
	.catch(error=>{
		console.log('api error', error.response);
		result = {
			error: ((error.response&&error.response.data&&error.response.data.error)||{msg:"비정상적인 오류입니다."}),
		};
	});
	return result;
}

const apiRequest = async (path, method, data, isFormRequest)=>{
	if(!isFormRequest)
		return await apiRequester({ path, method, data, });

		
	const formData = new FormData();

	Object.keys(data).map(key=>{
		formData.append(key, data[key]);
	});
	
	return await apiRequester({
		path,
		method,
		data: formData,
		headers: { 'Content-Type': 'multipart/form-data', },
	});
}


const Apis = {
	API_HOST:API_HOST,
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
	insertTask: async ({content, folder_id})=>{
		return await apiRequest("/task", "post", {content, folder_id});
	},
	editTask: async ({content, task_id})=>{
		return await apiRequest(`/task/${task_id}`, "post", {content});
	},
	insertFolder: async ({folderName:title, folderDescription:description, folderThumb:thumb})=>{
		let params = {title,description, };
		if(Object.keys(thumb).length)
			params.thumb = thumb;
		return await apiRequest("/folder", "post", params, true);
	},
}

export default Apis;