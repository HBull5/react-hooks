import {useState} from 'react';

const UseState = () => {
    const [count, setCount] = useState(0);

    function incrementCount() {
        setCount(prevCount => prevCount + 1);
    }

    function decrementCount() {
        setCount(prevCount => {
            const newCount = prevCount - 1; 
            return newCount > -1 ? newCount : 0; 
        });
    }

    return (
        <>
            <button onClick={decrementCount}>-</button>
            <span>{count}</span>
            <button onClick={incrementCount}>+</button>
        </>
    )
}

export default UseState;