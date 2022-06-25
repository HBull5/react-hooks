# Hook Basics

* You can only use hooks in function based components and not class based.
<br>

* Hooks must execute in the same order, e.g. you cannot conditionally use a hook, you either use it all the time or none of the time. (code example below)
```javascript react
// this will fail to compile
if(true) {
    useState(); 
}
useState(); 
useState();
```
<br>

* Hooks cannot be nested in conditionals, loops, or functions. They must be at the top level of the component. Best practice is to use all your hooks at the top of the component to avoid issues.
<br>