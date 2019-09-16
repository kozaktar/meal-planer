import styled from 'styled-components';



export const Modal=styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;
export const ModalContent=styled.div`
  background-color: #fefefe;
   margin: 5% auto; /* 15% from the top and centered */
  padding-bottom: 1rem;
  border: 1px solid #888;
  max-width: 20%; /* Could be more or less, depending on screen size */
  max-height: 80vh;
  border-radius: 15px;
  
`

export const CloseButton=styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin-top:-10px;
  

  &:hover{
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const ModalHeader=styled.div`
   display: flex;
   justify-content: space-between;
  border-bottom: 1px solid grey;
  padding: 10px 10px 0 10px;
  font-size:1.25rem;
  width:100%;
`;

export const ModalTitle=styled.span`
  
`;

