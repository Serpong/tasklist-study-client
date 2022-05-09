import React from 'react'
import axios from 'axios';

const API_HOST = "http://172.30.98.52:3000";

const Apis = {
	login:()=>{
		axios({
			method:	'post',
			url: 	API_HOST+"/auth/user-login",
			data: 	{
				userId:"thisisid2",
				userPass:"thisispass2",
			}
		})
		.then(response=>console.log(1, response.data))
		.catch(error=>console.log(2, error));
	}
}

export default Apis;