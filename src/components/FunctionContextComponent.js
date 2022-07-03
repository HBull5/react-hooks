import { useTheme, useThemeUpdate } from './ThemeContext';

function FunctionContextComponent() {
	const darkTheme = useTheme();
	const toggleTheme = useThemeUpdate();
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
			<button onClick={toggleTheme}>Toggle Theme</button>
			<div style={themeStyles}>Function Theme</div>
		</>
	);
}

export default FunctionContextComponent;
