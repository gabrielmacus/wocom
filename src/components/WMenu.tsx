import React from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';

interface MenuStyleProps
{
  position:('full-width-bottom'|'right-bottom'|'left-bottom'),
}

const Menu = styled.div<MenuStyleProps>`
z-index:1000;
position: absolute;
${props =>{
  
  switch (props.position) {
    case 'full-width-bottom':
      return `
      transform: translateY(100%);
      left:0;
      right:0;
      bottom:0;
      `;
    break;
    case 'right-bottom':
      return `
      transform: translateY(100%);
      right:0;
      bottom:0;
      `;
    break;
    case 'left-bottom':
      return `
      transform: translateY(100%);
      left:0;
      bottom:0;
      `;
    break;
  }
}
}

`;


interface WMenuProps
{
  children:React.ReactNode,
  opened?:boolean,
  position:('full-width-bottom'|'right-bottom'|'left-bottom'),
  onClose?:()=>any
}

export default function WMenu(props:WMenuProps) {


  return (
    <OutsideClickHandler onOutsideClick={()=>{ props.onClose?.() }}>
      {
        props.opened &&
        <Menu position={props.position}>
          {props.children}
        </Menu>
      }
    </OutsideClickHandler>
  )
}

