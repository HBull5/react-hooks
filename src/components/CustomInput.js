import React from 'react';

function CustomInput({}, ref) {
    return(<input ref={ref}/>)
}

export default React.forwardRef(CustomInput);