function reducer(state = {}, action){
	switch(action.type){
		case "add":
			return {...state, [action.param1]:"test"};
		default:
			return state;
	}
}

export const func1 = (param1)=>({type:"add", param1});

export default reducer;