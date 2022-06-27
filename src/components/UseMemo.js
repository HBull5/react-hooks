import {useState, useMemo, useEffect} from 'react';

function UseMemo() {
    const [number, setNumber] = useState(0);
    const [dark, setDark] = useState(true);
    
    const doubleNumber = useMemo(() => {
        return slowFunction(number);
    }, [number]);

    const themeStyles = useMemo(() => ({
        backgroundColor: dark ? '#000' : '#fff',
        color: dark ? '#fff' : '#000'
    }), [dark]); 

    useEffect(() => {
        console.log('theme styles updated');
    }, [themeStyles]);

    function slowFunction(number) {
        for(let i = 0; i < 1000000000; i++) {}
        return number * 2; 
    }

    return(
        <>
            <input type='number' value={number} onChange= {e => {setNumber(parseInt(e.target.value))}}/>
            <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
            <div style={themeStyles}>{doubleNumber}</div>
        </>
    );
}

export default UseMemo;