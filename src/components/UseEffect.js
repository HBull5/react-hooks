import {useState, useEffect} from 'react';

const UseEffect = () => {
    const [resourceType, setResourceType] = useState('posts');

    useEffect(() => {
        console.log('This will be called every re-render');
    });

    useEffect(() => {
        console.log('called only on load');
    }, []);

    return( 
        <>
            <div>
                <button onClick={() => {setResourceType('posts')}}>Posts</button>
                <button onClick={() => {setResourceType('users')}}>Users</button>
                <button onClick={() => {setResourceType('comments')}}>Comments</button>
            </div>
            <h1>{resourceType}</h1>
        </>
    )
}

export default UseEffect;