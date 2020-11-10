import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
position:relative;
width:100%;
`;
const StyledButton = styled.button`
display:block;
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
width:100%;
background-color: #5533ff;
color:white;
border: 0px transparent;
border-radius: 3px;
transition: all 0.2s;
cursor:pointer;
overflow: hidden;
padding: 15px 50px;
text-align: center;
display: inline-block;
font-size: 17px;
text-transform: uppercase;
font-weight: 700;
position: relative;
will-change: transform;
outline:0;
border:none;
transition:all 0.2s;
&:active
{
    box-shadow:none;
}
&:before
{
  
  transition:width 0.3s,left 0.3s, opacity 0.2s;
  content:'';
  position:absolute;
  top:0;
  left:40%;
  opacity:0;
  bottom:0;
  width:20%;
  height:100%;
  background:#2c63ff;
}

&:hover:before
{
  opacity:1;
  left:0%;
  width:100%;
}
`;

const ButtonLabel = styled.span`
position:relative;
display:block;
`;

export interface ButtonProps {
    children?:React.ReactNode,
    label:string,
    className?:string,
    onClick?(event:React.MouseEvent):any,
    onMouseDown?(event:React.MouseEvent):any,
    type?:('button'|'submit')
}

export default function WButton(props:ButtonProps) {


  return (
    <Container className={props.className}>
      <StyledButton type={props.type || 'button'} onMouseDown={props.onMouseDown} onClick={props.onClick}><ButtonLabel>{props.label}</ButtonLabel>{props.children}</StyledButton>
    </Container>
  );
}


