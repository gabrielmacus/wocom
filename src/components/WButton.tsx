import React from 'react';
import styled from 'styled-components'
//@ts-ignore
import α from 'color-alpha'


interface StyledButtonStyleProps
{
  bgHoverColor?:string,
  fgHoverColor?:string,
  bgColor?:string,
  fgColor?:string,
  selected?:boolean,
  styleType?:('unlevated' | 'outlined' | 'flat')
}

interface ButtonLabelStyleProps
{
  withIcon?:boolean
}

const Container = styled.div`
position:relative;
width:100%;
`;
const StyledButton = styled.button<StyledButtonStyleProps>`
display:block;
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
width:100%;
border: 0px transparent;
border-radius: 3px;
transition: all 0.2s;
cursor:pointer;
padding: 12px 20px;
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
}

&:hover:before
{
  opacity:1;
  left:0%;
  width:100%;
}

${props => props.selected ? `
box-shadow:none;
&:before
{
  opacity:1;
  left:0%;
  width:100%;
}

`: ''}

${props => {

  let bgColor = props.theme.primaryBackground;
  let fgColor = props.theme.primaryForeground;
  
  let bgHoverColor = props.theme.secondaryBackground;
  let fgHoverColor = props.theme.secondaryForeground;
  
  if(props.bgColor)
  {
    bgColor = props.theme[props.bgColor] || props.bgColor;
  }
  if(props.fgColor)
  {
    fgColor = props.theme[props.fgColor] || props.fgColor;
  }

  if(props.bgHoverColor)
  {
    bgHoverColor = props.theme[props.bgHoverColor] || props.bgHoverColor;
  }
  if(props.fgHoverColor)
  {
    fgHoverColor = props.theme[props.fgHoverColor] || props.fgHoverColor;
  }



  switch(props.styleType)
  {
    case 'unlevated':
      return `
      background-color: ${bgColor};
      color: ${fgColor};
      &:before {
        background: ${bgHoverColor};
      }
      &:hover
      {
        color: ${fgHoverColor};
      }
      box-shadow:none
      `;
    break;
    case 'flat':
      return `
      background-color: ${fgColor};
      color: ${bgColor};
      box-shadow:none;
      &:before
      {

        background: ${ α(bgColor,.2)};
        color: ${fgColor};
      }
      `;
    break;
    case 'outlined':
      return `
      background-color: ${fgColor};
      color: ${bgColor};
      box-shadow:none;
      &:before
      {

        background: ${ α(bgColor,.2)};
        color: ${fgColor};
      }
      outline:2px solid;
      `;
    break;
    default:
      return `
      background-color: ${bgColor};
      color: ${fgColor};
      &:before {
        background: ${bgHoverColor};
      }
      &:hover
      {
        color: ${fgHoverColor};
      }
      `;
    break;
  }


}}

`;

const ButtonLabel = styled.span<ButtonLabelStyleProps>`
position:relative;
display: flex;
justify-content: ${props => props.withIcon ? 'space-between':'center'};

`;

export interface ButtonProps {
    children?:React.ReactNode,
    label:string,
    className?:string,
    onClick?(event:React.MouseEvent):any,
    onMouseDown?(event:React.MouseEvent):any,
    type?:('button'|'submit'),
    selected?:boolean,
    bgHoverColor?:string,
    fgHoverColor?:string,
    bgColor?:string,
    fgColor?:string,
    iconRight?:React.ReactNode,
    iconLeft?:React.ReactNode,
    styleType?:('unlevated' | 'outlined' | 'flat')
}

export default function WButton(props:ButtonProps) {


  return (
    <Container className={props.className}>
      <StyledButton fgColor={props.fgColor} bgColor={props.bgColor} fgHoverColor={props.fgHoverColor} bgHoverColor={props.bgHoverColor}  styleType={props.styleType} selected={props.selected} type={props.type || 'button'} onMouseDown={props.onMouseDown} onClick={props.onClick}>
        <ButtonLabel withIcon={Boolean(props.iconLeft || props.iconRight)}>
          {props.iconLeft}
          {props.label}
          {props.iconRight}
        </ButtonLabel>
      </StyledButton>
      {props.children}
    </Container>
  );
}


