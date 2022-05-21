import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import ModalContainer from './ModalContainer';
import ModalWrappers from './ModalWrappers';


const Modal = ({wrapperType, wrapperProps, children, headerTitle, showModal, setShowModal, ...props})=>{
	const WrapperElement = ModalWrappers[wrapperType];

	const hideModal = ()=>{
		setShowModal(false);
	}
	
	if(!showModal) return (<></>);
	return (
		<ModalContainer headerTitle={headerTitle}>
			<WrapperElement {...wrapperProps} hideModal={hideModal}>
				{children}
			</WrapperElement>
		</ModalContainer>
	);
};
export default Modal;

			