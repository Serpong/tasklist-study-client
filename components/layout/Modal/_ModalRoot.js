import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalRemove } from '../../../reducers/modalReducer';
	
const ModalRoot = ()=>{
	console.log('changed');
	const dispatch = useDispatch();

	const modalList = useSelector(state=>state.modalReducer);
	const onModalCancel = (modalKey)=>()=>{
		dispatch(modalRemove(modalKey));
	}
	return (
		<>
			{Object.keys(modalList).map(modalKey=>{
				const Modal = modalList[modalKey];
				return <Modal key={modalKey} onModalCancel={onModalCancel(modalKey)} />;
			})}
		</>
	);
}

export default ModalRoot;