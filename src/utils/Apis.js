import React from 'react'
import axios from 'axios';
import FormData from 'form-data';
import GLOBALS from '@src/Globals';

const apiRequester = async({ path, method, data, headers, })=>{
	
	let result = {};

	await axios({
		method	: method,
		url		: GLOBALS.API_HOST+path,
		data	: data,
		timeout : 1000,
		headers : headers,
	})
	.then(response=>{
		result = response.data;
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
	API_HOST:GLOBALS.API_HOST,

	//auth
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

	//Folder
	insertFolder: async ({folderName:title, folderDescription:description, folderThumb:thumb})=>{
		let params = {title,description, };
		if(Object.keys(thumb).length)
			params.thumb = thumb;
		return await apiRequest("/folders", "post", params, true);
	},
	getFolderList: async ()=>{
		return await apiRequest("/folders", "get");
	},

	//Task
	getTaskList: async ({folder_id})=>{
		return await apiRequest(`/tasks/findByFolder/${folder_id}`, "get");
	},
	insertTask: async ({content, folder_id})=>{
		return await apiRequest("/tasks", "post", {content, folder_id});
	},
	editTask: async ({content, task_id})=>{
		return await apiRequest(`/tasks/${task_id}`, "post", {content});
	},
	deleteTask: async ({task_id})=>{
		return await apiRequest(`/tasks/${task_id}`, "delete");
	},
}

export default Apis;