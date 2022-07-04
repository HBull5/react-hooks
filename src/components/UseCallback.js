import { useEffect, useState, useCallback } from 'react';

function List({ getItems }) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		console.log('use effect called');
		setItems(getItems(5)); 
	}, [getItems]);

	return(
		<>
			{items.map((item, index) => (
				<p key={index}>{item}</p>
			))}
		</>
	)
}

function UseCallback() {
	const [number, setNumber] = useState(0);
	const [dark, setDark] = useState(false);

	// getItems is being set to the entire callback function, where if we we're using useMemo it would be set to the resulting array. 
	const getItems = useCallback((incrementor) => {
		return [number + incrementor, number + 1 + incrementor, number + 2 + incrementor];
	}, [number]); 

	const theme = {
		backgroundColor: dark ? '#333' : '#fff', 
		color: dark ? '#fff' : '#333',
		borderColor: dark ? '#fff' : '#333',
		borderWidth: '1px',
		borderStyle: 'solid'
	}

	return (
		<>
			<div style={theme}>
				<input type="number" value={number} onChange={e => {setNumber(parseInt(e.target.value))}} />
				<button onClick={() => {setDark(prevDark => !prevDark)}}>Toggle Theme</button>
				<List getItems={getItems} />
			</div>
		</>
	);
}

export default UseCallback;
