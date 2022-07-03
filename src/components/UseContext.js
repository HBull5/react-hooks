import ThemeProvider from './ThemeContext';
import FunctionContextComponent from './FunctionContextComponent';

function UseContext() {
	return (
		<>
			<ThemeProvider>
				<FunctionContextComponent />
			</ThemeProvider>
		</>
	);
}

export default UseContext;
