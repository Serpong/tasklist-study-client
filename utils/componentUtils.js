import React from 'react';
import { useState } from "react";

export const useInputs = (initialState)=>{
	const [inputs, setInputs] = useState(initialState);

	const setInput = (name, value)=>{
		setInputs({
			...inputs,
			[name]: value
		});
	}

	const inputProps = (name)=>({
		value		: inputs[name],
		onChangeText: (val)=>{setInput(name, val)}
	});

	const get = (name)=>inputs[name];

	return {
		inputProps,
		setInput,
		...inputs
	};
}