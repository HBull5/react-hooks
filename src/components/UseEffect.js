import {useState, useEffect} from 'react';

const UseEffect = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [resourceType, setResourceType] = useState('posts');
    const [items, setItems] = useState([]);

    function handleResize() {
        setWindowWidth(window.innerWidth);
    }
    
    useEffect(() => {
        console.log('This will be called every re-render');
    });

    useEffect(() => {
        console.log('called only on load');
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);  
        }
    }, []);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then(res => res.json())
            .then(json => setItems(json))
            .catch(err => {console.error(err)});
    }, [resourceType]);

    return( 
        <>
            <div>{windowWidth}</div>
            <div>
                <button onClick={() => {setResourceType('posts')}}>Posts</button>
                <button onClick={() => {setResourceType('users')}}>Users</button>
                <button onClick={() => {setResourceType('comments')}}>Comments</button>
            </div>
            <h1>{resourceType}</h1>
            {items.map(item => (
                <pre key={item.id}>{JSON.stringify(item)}</pre>
            ))}
        </>
    )
}

export default UseEffect;