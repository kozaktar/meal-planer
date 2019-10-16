import React from 'react';
import {Group, FormInputField, InputLabel} from './form-input.styles';

const FormInput = ({ handleChange, label, type, ...otherProps }) => (
  <Group>
    <FormInputField onChange={handleChange} {...otherProps} type={type}/>
    {label ? (
      <InputLabel>
        {label}
      </InputLabel>
    ) : null}
  </Group>
);

export default FormInput;
