import {useState, useEffect, useRef} from 'react';

function UseRef() {
    const [name, setName] = useState('');
    const prevRenderName = useRef('');
    const renderCount = useRef(0);
    const inputRef = useRef();

    useEffect(() => {
        renderCount.current = renderCount.current + 1; 
    });

    useEffect(() => {
        prevRenderName.current = name; 
    }, [name]);

    function focusInput() {
        inputRef.current.focus(); 
    }
 
    return(
        <>
            <input ref={inputRef} type="text" value={name} onChange={e => {setName(e.target.value)}} />
            <p>My name is {name}</p>
            <p>Previous render name is {prevRenderName.current}</p>
            <p>I rendered {renderCount.current} times.</p>
            <button onClick={() => {focusInput()}}>Focus Input</button>
        </>
    )
}

export default UseRef;