import React from 'react';

import ModalContainer from "../components/layout/modal/ModalContainer";


function reducer(state = {}, action){
	switch(action.type){
		case "modalNew":
			return {...state, [action.modalKey]:action.element};
		case "modalRemove":
			const {[action.modalKey]:_, ...newState} = state;
			return {...newState };
		default:
			return state;
	}
}

export const modalNew = ({WrapperElement, wrapperProps, InnerElement, headerTitle})=>{
	const modalKey = (new Date()).getTime().toString() + Math.random().toString();
	
	return {
		type:"modalNew",
		modalKey,
		element:({onModalCancel, ...props})=>(
			<ModalContainer headerTitle={headerTitle}>
				<WrapperElement {...wrapperProps} onModalCancel={onModalCancel}>
					<InnerElement />
				</WrapperElement>
			</ModalContainer>
		)
	};
};


export const modalRemove = (modalKey)=>{
	return {type:"modalRemove", modalKey};
};

export default reducer;