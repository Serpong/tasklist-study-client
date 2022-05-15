const initialState = {
	isLoggedIn: false,
};

function reducer(state = initialState, action){
	switch(action.type){
		case "login":
			return {...state, isLoggedIn: true};
		case "logout":
			return {...state, isLoggedIn: false};
		default:
			return state;
	}
}

export const userSetLogin = ()=>({type:"login"});

export default reducer;