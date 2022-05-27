const initialState = {
	isLoggedIn: false,
};

function reducer(state = initialState, action){
	switch(action.type){
		case "userLogin":
			return {...state, isLoggedIn: true};
		case "userLogout":
			return {...state, isLoggedIn: false};
		default:
			return state;
	}
}

export const userSetLogin = ()=>({type:"userLogin"});
export const userSetLogout = ()=>({type:"userLogout"});

export default reducer;