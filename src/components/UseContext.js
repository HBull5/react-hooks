import React, { useState } from 'react';
import FunctionContextComponent from './FunctionContextComponent';

export const ThemeContext = React.createContext();

function UseContext() {
	const [darkTheme, setDarkTheme] = useState(true);

	function toggleTheme() {
		setDarkTheme(prevDarkTheme => !prevDarkTheme);
	}

	return (
		<>
			<ThemeContext.Provider value={darkTheme}>
				<button onClick={toggleTheme}>Toggle Theme</button>
				<FunctionContextComponent />
			</ThemeContext.Provider>
		</>
	);
}

export default UseContext;
