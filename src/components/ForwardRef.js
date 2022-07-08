import CustomInput from './CustomInput';
import { useState, useRef } from 'react';

function UseImparativeHandle() {
    const [value, setValue] = useState('red');
    const inputRef = useRef();

    return(<>
        <CustomInput
            ref={inputRef}
            value={value}
            onChange={e => {setValue(e.target.value)}}
        />
        <br />
        <button onClick={() => {inputRef.current.focus();}}>Focus</button>
    </>)
}

export default UseImparativeHandle;