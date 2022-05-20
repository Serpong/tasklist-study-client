// function CustomModal(){

// 	let el = null;
// 	const setEl = (newEl)=>{
// 		el = newEl;
// 	}
// 	const consoleEl = ()=>{
// 		console.log(el);
// 		// func1(123);
// 		const [aaaa,bbbb] = useState(1);
// 		bbbb(2);
// 		console.log(aaaa);
// 	}

// 	return { setEl, consoleEl}
// }

function reducer(state = {testing2:"initaildata"}, action){
	switch(action.type){
		case "test":
			return {...state, testing2:action.param1};
		default:
			return state;
	}
}

export const func1 = (param1)=>({type:"add", param1});

export default reducer;