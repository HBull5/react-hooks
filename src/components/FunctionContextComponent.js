import { useContext } from 'react';
import { ThemeContext } from './UseContext';

function FunctionContextComponent() {
	const darkTheme = useContext(ThemeContext);
	const themeStyles = {
		backgroundColor: darkTheme ? '#333' : '#ccc',
		color: darkTheme ? '#fff' : '#000',
		borderColor: darkTheme ? '#fff' : '#000',
		borderWidth: '1px',
		borderStyle: 'solid',
		padding: '2rem',
		margin: '2rem'
	};

	return (
		<>
			<div style={themeStyles}>Function Theme</div>
		</>
	);
}

export default FunctionContextComponent;
