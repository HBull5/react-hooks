# Hook Basics

* You can only use hooks in function based components and not class based.

* Hooks must execute in the same order, e.g. you cannot conditionally use a hook, you either use it all the time or none of the time. (code example below)
```javascript react
// this will fail to compile
if(true) {
    useState(); 
}
useState(); 
useState();
```

* Hooks cannot be nested in conditionals, loops, or functions. They must be at the top level of the component. Best practice is to use all your hooks at the top of the component to avoid issues.

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