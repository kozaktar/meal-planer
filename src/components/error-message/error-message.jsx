import React from 'react';

const errorMessageStyles={
    color:'red',
    margin:'5px'
}

const ErrorMessage=({children})=>(
    <div style={errorMessageStyles}>
        {children}
    </div>
)

export default ErrorMessage;