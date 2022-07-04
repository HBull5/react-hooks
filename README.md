# Documentation

-   This repo is an actual react project where you can run and experiment with the examples, along with this there are descriptions and overviews of the hooks here in this readme file as well.

<br>

# Hook Basics

-   You can only use hooks in function based components and not class based.

-   Hooks must execute in the same order, e.g. you cannot conditionally use a hook, you either use it all the time or none of the time. (code example below)

```javascript react
// this will fail to compile.
if (true) {
	useState();
}
useState();
useState();
```

-   Hooks cannot be nested in conditionals, loops, or functions. They must be at the top level of the component. Best practice is to use all your hooks at the top of the component to avoid issues.

<br>

# Use State

-   State is immutable meaning it cannot be modified, though state is expected to change. This is handled by calling a setter function that destroys and recreates state with the modified values every time state needs to be udpated.

-   To use the useState hook it'll need to be imported from react as shown below.

```javascript react
import { useState } from 'react';
```

-   `useState()` returns an array, in most instances you'll want to instantiate your state as shown in the code example below.
    -   The first element of the array is the variable in which the state is stored.
    -   The second element of the array is a setter function that is used to update state.

```javascript react
const [state, setState] = useState();
```

-   You can have multiple instances of state if necessary. There is no limit that I know of to the number of states that can exist in a component though you probably don't won't to bloat your component with state unless necessary.

```javascript react
const [state1, setState1] = useState();
const [state2, setState2] = useState();
```

-   There are two ways to intalize state, the first and most common is to just simply pass in the value you'd like. This can be anything you might need, string, integer, array, object, etc. However this is set everytime the component renders so if you are do something resource or network intense. You can pass in a function as the argument and this will only set the intial state once.

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

-   The setter function can be called in a number of ways you can simply pass in a value to set the state or you can use a callback where the parameter in the callback is the previous state. For most cases it is safest to use the callback method of updating a value. Since state is immutable if you don't use the callback your state won't be updated until re-render. The code below demonstrates this.

```javascript react
const [count, setCount] = useState(0);

// improper way to handle modifying a previous state.
setState(count + 1); // count which is 0 + 1 returns 1 in this instance.
setState(count + 1); // count is imutable meaning it is still 0 in this instance again resulting in 1.
console.log(count); // this will return 1, not 2 as expected.

// proper way to modify previous state.
setState(prevCount => prevCount + 1); // prevCount is equal to states last value which in this instance is 0.
setState(prevCount => prevCount + 1); // prevCount is mutable and it is 1 at this point due to the line above.
console.log(count); // here we get the expected result of 2.
```

-   When updating state that is set to an object or an array you'll want to spread the previous array or object and then perform your mutation. However it can be easiest to sometimes just create several states instead of storing state in an object or an array.

```javascript react
// updating array state.
const [array, setArray] = useState([]);
function addNewElement(element) {
	setArray(prevElements => [...prevElements, element]);
}

// updating object state.
const [object, setObject] = useState({});
function addNewProperty(key, value) {
	setObject(prevObject => ({
		...prevObject,
		[key]: value
	}));
}
```

<br>

# Use Effect

-   The `useEffect` hook is for executing a callback function whenever something happens. This can be onload, every re-render, or when some state updates.

-   To use the `useEffect` hook you'll have to import it to your component as shown below.

```javascript react
import { useEffect } from 'react';
```

-   The `useEffect` hook takes to paramters, a callback function and an array of dependencies for when to fire the callback.

-   You can have multiple instances of `useEffect` without issue.

```javascript react
useEffect(() => {
	console.log('use-effect-1');
});

useEffect(() => {
	console.log('use-effect-2');
});
```

-   You can have an `useEffect` callback fire everytime the a components re-renders simply define the callback without passing in any dependencies.

```javascript react
useEffect(() => {
	console.log('This will be called every re-render');
});
```

-   You can have an `useEffect` callback fire only on when the component first mounts.

```javascript react
useEffect(() => {
	console.log('only fires on load');
}, []);
```

-   You can have an `useEffect` callback fire only when some state updates, or if one of of the many states passed into the array udpates. Note that this will also fire once the state is first set as the component mounts.

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

-   For any `useEffect` hook you can run a function on unmount by simply returning a function to be called inside of the `useEffect` callback.

```javascript react
useEffect(() => {
	console.log('component mounted');

	return () => {
		console.log('component unmounted');
	};
}, []);
```

-   If you want to run a clean up function between state changes you will also just simply return that clean up function in your `useEffect` callback. This return function will also run when when the component is unmounted.

```javascript react
useEffect(() => {
	console.log('state changed');

	return () => {
		console.log('clean up function');
	};
}, [state]);
```

-   **WARNING** this is a bit of a tangent, but might be useful for understanding how `useEffect` works and could be helpful for debugging your `useEffect` hooks.

    -   `useEffect` is only called once when the component is rendered and if one of the dependencies are different between renders. However the `useEffect` callback will
        be called on page load b/c there the value will be initally set.

    ```javascript react
    /* The use effect is called once on render b/c
    the value is intially set on page load. Even
    though the onClick function updates the date
    value the use effect is NOT called b/c the page
    is not re-rendered by the variable changing. */
    let date = new Date();

    useEffect(() => {
        console.log('use effect');
    }, [date]);

    return(
        <button onClick={date = new Date();}></button>
    )
    ```

    -   You could in theory use a normal variable in your component as a dependency of `useEffect`, however changing a variables value does not trigger a re-render and therefore the `useEffect` call back is not fired. In general using variables for dependencies in `useEffect` can get messy and isn't recommended. Check out the code example below.

    ```javascript react
    /* Notice how in this example since the value is
    always the same between re-renders we only ever 
    get the first use effect due to the intial setting 
    of the variable however between state changes notice
    that the use effect function is not recalled. Also
    if you click the update my var you'll notice the 
    value does change but once you update state and the
    component re-renders the myVar is reset back to true
    after resulting in no difference for the useEffect
    function to fire. */
    const [state, setState] = useState(0);
    let myVar = true;

    useEffect(() => {
    	console.log('use effect');
    }, [myVar]);

    return (
    	<>
    		<button
    			onClick={() => {
    				setState(prevState => prevState + 1);
    			}}
    		>
    			update state
    		</button>
    		<button
    			onClick={() => {
    				myVar = !myVar;
    			}}
    		>
    			Update My Var
    		</button>
    	</>
    );

    /* In this example we get the use effect callback
    firing everytime state updates b/c the state change
    forces a re-render and new Date() returns the most 
    recent date time which will be different from the 
    previous hence calling the use effect callback. */
    const [state, setState] = useState(0);
    let myVar = new Date();

    useEffect(() => {
    	console.log('use effect');
    }, [myVar]);

    return (
    	<>
    		<button
    			onClick={() => {
    				setState(prevState => prevState + 1);
    			}}
    		>
    			update state
    		</button>
    		{/* removed the button here as it would update it to the new Date but wouldn't cause a
            re-render and once the update state button is clicked it will then call a new Date() 
            again once the myVar variable is intialized and assigned. */}
    	</>
    );
    ```

<br>

# Use Memo

-   `useMemo` is primarly used for performance optimization by effectively caching a value so a calculation doesn't have to be needlessly run if its input and therefore output will not change. This of course only works with functions that will return the same output given the same input. This process is called memoization you can read more about <a href="https://en.wikipedia.org/wiki/Memoization">here</a>. `useMemo` can also be used for comparing reference values between renders.

-   `useMemo` will need to be imported to be used in your component.

```javascript react
import { useMemo } from 'react';
```

-   `useMemo` takes two arguments a callback function that should return a value you want to memoize, the second argument is an array of dependecies. An easy way to think of this is the return in the callback is the function used to calculate the value and the dependencies are your inputs you pass into that function. This is so when react sees that one of the inputs has changed it knows to then re-run the function to calculate the new value.

```javascript react
const result = useMemo(() => {
	return slowFunction(input);
}, [input]);
```

-   The second use case for `useMemo` is for referential equality. You can read more a referential equality in JS <a href="https://dmitripavlutin.com/how-to-compare-objects-in-javascript/">here</a>, but basically since objects and arrays point to place and memory and not the value(s) even if the contents of the array or the object are the same as another they may not be equal if they are different variables or instantiated at different times.

```javascript react
/* here the value won't be updated unless the dark variable changes.
Therefore since it doesn't update between renders this value points 
to the same place in memory and the subsequent use effect function is 
not called unless the value is different in which there will be a new
location in memory as well from useMemo re-evaluating the value. */
const themeStyles = useMemo(
	() => ({
		backgroundColor: dark ? '#000' : '#fff',
		color: dark ? '#fff' : '#000'
	}),
	[dark]
);

/* If we didn't have the above value memoized this would be called 
every re-render even if the values of the themeStyles object were 
exactly the same b/c it would be a new copy and point to a different
place in memory. */
useEffect(() => {
	console.log('theme styles updated');
}, [themeStyles]);
```

<br>

# Use Ref

-   `useRef` works functionally much like state the big difference between `useRef` and `useState` being that `useRef` does not trigger a re-render.

-   You can import `useRef` as shown below.

```javascript react
import { useRef } from 'react';
```

-   `useRef` returns an object that has a single property in it of `current` this will return the value you have stored in it.

```javascript react
const renderCount = useRef(1);

useEffect(() => {
	renderCount.current = renderCount.current + 1;
});
```

-   The most common use case for `useRef` is to reference elements in your HTML.

```javascript react
const inputRef = useRef();

return <input ref={inputRef} type="text" />;
```

-   You can call standard DOM element methods on any of the elements set as a reference as you would in vanilla Javascript.

```javascript react
const inputRef = useRef();

function focusInput() {
    inputRef.current.focus();
}

return (
    <input ref={inputRef} type='text' />
    <button onClick={() => {focusInput()}}>
)
```

-   You can have multiple `useRef`'s in your component at a give time.

```javascript react
const textRef = useRef();
const emailRef = useRef();

return (
    <>
        <input ref={textRef} type='text'>
        <input ref={emailRef} type='email'>
    </>
)
```

<br>

# Use Context

-   `useContext` is primarily used as a means to avoid <a href="https://kentcdodds.com/blog/prop-drilling#what-is-prop-drilling">prop drilling</a> by creating a global state, or a state at the highest level in which the state is used.

-   To use the context api you'll need to import the entire react library so you can call the `createContext()` method. You will generally also want to export the createdContext to be used elsewhere in your application.

```javascript react
import React from 'react';

export const myContext = React.createContext();
```

-   To consume or use the context ensure that the component trying to utilize the context in has a the context provider in some parent component, how far up the tree doesn't matter as long as a parent has the context provider. The `Provider` takes a single `prop` of value that will be whatever the value you want to pass along to children components to be. Additionally you'll need to use the `useContext` hook in the child component as well. The `useContext` hook takes one argument of the context you defined in the parent typically this is exported from the parent and imported into the child. However in the example below this is not done to demo how it works in a single file.

```javascript react
// Parent Component
import React from 'react';

const MyContext = React.createContext(); // you would normally export this so you can use it in other components.

function parentComponent() {
	const contextValue = true;

	return (
		<MyContext.Provider value={contextValue}>
			<ChildComponent />
		</MyContext.Provider>
	);
}

// Child Component
import { useContext } from 'react';

function childComponent() {
	const contextValue = useContext(MyContext); // typically you would import "MyContext" to be able to use it here.

	return <p>{contextValue.toString()}</p>;
}
```

-   Though this is a valid way of utilizing the context api in react, there is a cleaner way that can make getting and setting your context inside of children much easier without all of the hoops. This really only makes sense when broken across multiple components and files like an actual react project would be though I've done this in this project checkout these files to see how you can easily pass context down to children here: <a href="https://github.com/HBull5/react-hooks/blob/main/src/components/ThemeContext.js">global context</a>, <a href="https://github.com/HBull5/react-hooks/blob/main/src/components/UseContext.js">parent component</a>, and <a href="https://github.com/HBull5/react-hooks/blob/main/src/components/FunctionContextComponent.js">child component</a>.

<br>

# Use Reducer

-   Allows you to manage state and re-render a component when that state changes. It allows you to manage complex state a little easier. This use a similar pattern to redux. The most common use case I can think of is if you have multiple pieces of state you need to manage together.

-   To use `useReducer` in your component simply import it as shown in the code example below.

```javascript react
import { useReducer } from 'react';
```

-   `useReducer` is instantiated much like `useState` where you'll destructure an array the first element being state of your reducer and the second being a `dispatch` function that could be named anything but basically the function you'll call to start the reducer. The actual `useReducer` hook takes two parameters a function to be called, conventionally named `reducer` and and initial state.

```javascript react
import { useReducer } from 'react';

const [reducerState, dispatch] = useReducer(reducer, []); // initial state is usually an array or an object.
```

-   The `reducer` function you define will take two parameters the previous state (note this is immutable) and an action which is the parameters you pass into your dispatch function. The return value of your `reducer` function will be the new reducer state. When you call your dispatch function convention dictates you pass an object with two properties one of type to determine which action needs to be performed and a payload property containing any data type suitable to your use case. The below example doesn't include the use of a payload but if you want a more clear example you can check <a href="https://github.com/HBull5/react-hooks/blob/main/src/components/UseReducer.js">here</a>.

```javascript react
import { useReducer } from 'react';

function reducer(reducerState, action) {
	switch (action.type) {
		case 'increment':
			return { ...reducerState, count: reducerState.count + 1 };
		case 'decrement':
			return { ...reducerState, count: reducerState.count - 1 };
		default:
			return reducerState;
	}
}

function Component() {
	const [useReducer, dispatch] = useReducer(reducer, {});

	return (
		<>
			<button
				onClick={() => {
					dispatch({ type: 'decrement' });
				}}
			>
				-
			</button>
			<span>{useReducer.count}</span>
			<button
				onClick={() => {
					dispatch({ type: 'increment' });
				}}
			>
				+
			</button>
		</>
	);
}
```

<br>

# Use Callback

- To use `useCallback` in your component simply import it as shown below. 
```javascript react
import {useCallback} from 'react';
```

- `useCallback` works a lot like `useMemo` the main difference is `useMemo` memoizes a value, be it a integer, string, object, array, etc... while `useCallback` memoizes a function definition. 
```javascript react
// callback will return the entire function definiton
const callback = useCallback(() => {
	return [number, number + 1, number + 2];
}, [number]); 

// this will return the resulting array
const memo = useMemo(() => {
	return [number, number + 1, number + 2];
}, [number]);
```

- `useCallback` can allow you to pass a function definition as a dependency of `useEffect` just like you could with `useMemo` however, the main advantage with `useCallback` is since it store the function definition you can then all that function with whatever parameters you may need to unlike `useMemo`. You can see a good example of that <a href="https://github.com/HBull5/react-hooks/blob/main/src/components/UseCallback.js">here</a>.

<br>

# Custom Hooks
