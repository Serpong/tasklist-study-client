function reducer(state = {}, action){
	switch(action.type){
		case "add":
			return {...state, [action.key]:action.element};
		default:
			return state;
	}
}

export const modalAdd = (key, element)=>({type:"add", key, element});

export default reducer;