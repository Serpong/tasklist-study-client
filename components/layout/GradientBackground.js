import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({...props})=>{
	return (
		<LinearGradient {...props} style={{flex:1}} />
	);
}

export default GradientBackground;