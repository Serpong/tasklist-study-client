import React, {useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";

import { userSetLogin, userSetLogout } from '@src/reducers/userReducer';
import AuthNavigator from "@src/navigators/AuthNavigator";
import MainNavigator from "@src/navigators/MainNavigator";
import Apis from '@src/utils/Apis';


const Navigations = ()=>{
	
	const dispatch = useDispatch();

	//login check
	useEffect(()=>{
		(async ()=>{
			const loginCheckResult = await Apis.loginCheck();
			if(loginCheckResult.error || loginCheckResult.data.isLoggedIn == false)
				dispatch(userSetLogout());
			else
				dispatch(userSetLogin());
			console.log("로그인 체크");
		})();
	}, []);


	const {isLoggedIn} = useSelector(state=>state.userReducer);
	
	return (
		<>
			<NavigationContainer>
				{ !isLoggedIn ? <AuthNavigator /> : <MainNavigator /> }
			</NavigationContainer>
		</>
	);
}

export default Navigations;