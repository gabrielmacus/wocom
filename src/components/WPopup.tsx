import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Popup = styled.div`
z-index:100000;
background-color:rgba(0,0,0,0.75);
position:fixed;
left:0;
top:0;
right:0;
bottom:0;
display:flex;
align-items:center;
justify-content:center;
`;
const PopupContent = styled.div`

`;

const PopupClose = styled.div`
cursor:pointer;
color:white;
position: fixed;
right: 30px;
top: 20px;
font-size: 30px;

`;

interface WPopupProps
{
  opened?:boolean,
  onClose?:()=>any
  children:React.ReactNode
}

export default function WPopup(props:WPopupProps) {


  return (
    <React.Fragment>
      { props.opened &&
      <Popup >
        <PopupClose onClick={()=> props.onClose?.()}><FontAwesomeIcon icon={faTimes} /></PopupClose>
        <PopupContent>
          {props.children}
        </PopupContent>
      </Popup>
      }
    </React.Fragment>
  )
}

