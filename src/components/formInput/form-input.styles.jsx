import styled, {css} from 'styled-components'


export const Group=styled.div`
  position: relative;
  margin: 25px 0;
`
export const InputLabel=styled.label`
color: black;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  background: white;
  
`
export const FormInputField=styled.input`
    background: none;
    background-color: white;
    color: black;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border-radius: 5px;
    border: 1px solid black;
    margin: 1px 0;
    ${props=>props.type==='password'?`letter-spacing: 0.3em;`:``}

    &:focus {
      outline: none;
      border-color:#99ccff;
    }

    &:focus ~ ${InputLabel} {
      top: -9px;
      font-size: 12px;
      color: $main-color;
    }

`

