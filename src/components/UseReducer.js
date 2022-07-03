import { useReducer, useState } from 'react';

function reducer(todos, action) {
    switch(action.type) {
        case 'add-todo':
            return [...todos, action.payload.name ]
        case 'remove-todo':
            return todos.filter((todo, index) => index !== action.payload.index)
        default: 
            return todos
    }
}

function UseReducer() {
    const [todos, dispatch] = useReducer(reducer, []); 
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        dispatch({ type: 'add-todo', payload: { name } });
        setName('');
    }

	return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} onClick={() => {dispatch({ type: 'remove-todo', payload: { index }})}}>{todo}</li>
                ))}
            </ul>
        </>
    );
}

export default UseReducer;
