import React, {useEffect} from 'react';

import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigators/AuthNavigator";
import MainNavigator from "./navigators/MainNavigator";
import { useDispatch, useSelector } from 'react-redux';
import Apis from './utils/Apis';
import { userSetLogin, userSetLogout } from './reducers/userReducer';
import { modalRemove } from './reducers/modalReducer';
// import ModalRoot from './components/layout/modal/ModalRoot';


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
	// const isLoggedIn = true;
	
	return (
		<>
			<NavigationContainer>
				{ !isLoggedIn ? <AuthNavigator /> : <MainNavigator/> }
			</NavigationContainer>
			{/* <ModalRoot /> */}
		</>
	);
}

export default Navigations;