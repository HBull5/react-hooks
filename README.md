# Hook Basics

* You can only use hooks in function based components and not class based.

* Hooks must execute in the same order, e.g. you cannot conditionally use a hook, you either use it all the time or none of the time. (code example below)
```javascript react
// this will fail to compile.
if(true) {
    useState(); 
}
useState(); 
useState();
```

* Hooks cannot be nested in conditionals, loops, or functions. They must be at the top level of the component. Best practice is to use all your hooks at the top of the component to avoid issues.

<br>

# Use State

* State is immutable meaning it cannot be modified, though state is expected to change. This is handled by calling a setter function that destroys and recreates state with the modified values every time state needs to be udpated.

* To use the useState hook it'll need to be imported from react as shown below.
```javascript react 
import {useState} from 'react';
```

* `useState()` returns an array, in most instances you'll want to instantiate your state as shown in the code example below. 
    * The first element of the array is the variable in which the state is stored. 
    * The second element of the array is a setter function that is used to update state. 
```javascript react 
const [state, setState] = useState(); 
```

* You can have multiple instances of state if necessary. There is no limit that I know of to the number of states that can exist in a component though you probably don't won't to bloat your component with state unless necessary. 
```javascript react
const [state1, setState1] = useState();
const [state2, setState2] = useState(); 
```

* There are two ways to intalize state, the first and most common is to just simply pass in the value you'd like. This can be anything you might need, string, integer, array, object, etc. However this is set everytime the component renders so if you are do something resource or network intense. You can pass in a function as the argument and this will only set the intial state once. 
```javascript react
// setting state to intial value, set everytime component renders.
const [string, setString] = useState('');
const [int, setInt] = useState(0);
const [array, setArray] = useState([]);
const [obj, setObj] = useState({});

// setting state with a function, set only when component first mounts.
const [count, setCount] = useState(() => {
    return 0;  
});
```

* The setter function can be called in a number of ways you can simply pass in a value to set the state or you can use a callback where the parameter in the callback is the previous state. For most cases it is safest to use the callback method of updating a value. Since state is immutable if you don't use the callback your state won't be updated until re-render. The code below demonstrates this. 
```javascript react
const [count, setCount] = useState(0);

// improper way to handle modifying a previous state.
setState(count + 1); // count which is 0 + 1 returns 1 in this instance. 
setState(count + 1); // count is imutable meaning it is still 0 in this instance again resulting in 1. 
console.log(count); // this will return 1, not 2 as expected. 

// proper way to modify previous state.
setState(prevCount => prevCount + 1); // prevCount is equal to states last value which in this instance is 0. 
setState(prevCount => prevCount + 1); // prevCount is mutable and it is 1 at this point due to the line above. 
console.log( ); // here we get the expected result of 2. 
```

* When updating state that is set to an object or an array you'll want to spread the previous array or object and then perform your mutation. However it can be easiest to sometimes just create several states instead of storing state in an object or an array.
```javascript react 
// updating array state.
const [array, setArray] = useState([]);
function addNewElement(element) {
    setArray(prevElements => ([...prevElements, element])); 
}

// updating object state.
const [object, setObject] = useState({});
function addNewProperty(key, value) {
    setObject(prevObject => ({
        ...prevObject, 
        [key]: value
    }))
}
```

<br>

# Use Effect

* The `useEffect` hook is for executing a callback function whenever something happens. This can be onload, every re-render, or when some state updates. 

* To use the `useEffect` hook you'll have to import it to your component as shown below. 
```javascript react 
import {useEffect} from 'react';
```

* The `useEffect` hook takes to paramters, a callback function and an array of dependencies for when to fire the callback. 

* You can have multiple instances of `useEffect` without issue. 
```javascript react 
useEffect(() => {
    console.log('use-effect-1');
});

useEffect(() => {
    console.log('use-effect-2');
});
```

* You can have an `useEffect` callback fire everytime the a components re-renders simply define the callback without passing in any dependencies. 
```javascript react 
useEffect(() => {
    console.log('This will be called every re-render');
});
```

* You can have an `useEffect` callback fire only on when the component first mounts. 
```javascript react
useEffect(() => {
    console.log('only fires on load');
}, []);
```

* You can have an `useEffect` callback fire only when some state updates, or if one of of the many states passed into the array udpates. Note that this will also fire once the state is first set as the component mounts.
```javascript react 
const [string, setString] = useState('');
const [count, setCount] = useState(0);

useEffect(() => {
    console.log('fires only when string is updated');
}, [string]); 

useEffect(() => {
    console.log('fires only when count is updated');
}, [string]); 

useEffect(() => {
    console.log('fires only when string or count is updated');
}, [string, count]); 
```

* For any `useEffect` hook you can run a function on unmount by simply returning a function to be called inside of the `useEffect` callback.
```javascript react
useEffect(() => {
    console.log('component mounted');

    return () => {
        console.log('component unmounted');
    }
}, []);
```

* If you want to run a clean up function between state changes you will also just simply return that clean up function in your `useEffect` callback. 
```javascript react 
useEffect(() => {
    console.log('state changed');

    return () => {
        console.log('clean up function');
    };
}, [state]);
```