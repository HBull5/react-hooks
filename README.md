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

