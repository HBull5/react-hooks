import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

// custom hook to export getting context to children
export function useTheme() {
	return useContext(ThemeContext);
}

// custom hook to export setting context to children
export function useThemeUpdate() {
	return useContext(ThemeUpdateContext);
}

// can take in a prop of children which will just be all of the children of the this component
export default function ThemeProvider({ children }) {
	const [darkTheme, setDarkTheme] = useState(true);

	function toggleTheme() {
		setDarkTheme(prevDarkTheme => !prevDarkTheme);
	}

	return (
		<ThemeContext.Provider value={darkTheme}>
			<ThemeUpdateContext.Provider value={toggleTheme}>{children}</ThemeUpdateContext.Provider>
		</ThemeContext.Provider>
	);
}
