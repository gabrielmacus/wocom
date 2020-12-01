import React, { CSSProperties } from 'react';
import styled from 'styled-components'
//@ts-ignore
import α from 'color-alpha'
import OutsideClickHandler from 'react-outside-click-handler';
import Hammer from 'react-hammerjs';

interface StyledButtonStyleProps
{
  disabled?:boolean;
  bgHoverColor?:string,
  fgHoverColor?:string,
  bgColor?:string,
  fgColor?:string,
  selected?:boolean,
  styleType?:('unlevated' | 'outlined' | 'flat'),
  size?:('small'|'default')
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
border-radius: 3px;
overflow:hidden;
${props => props.disabled ? `
opacity:0.6;
pointer-events:none;
`: ''}

display:block;
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
width:100%;
border: 0px transparent;

transition: all 0.2s;
cursor:pointer;
text-align: center;
display: inline-block;
text-transform: uppercase;
font-weight: 700;
position: relative;
will-change: transform;
outline:0;
border:none;
transition:all 0.2s;

${props => {

  switch(props.size)
  {
    case 'small':
      return `
      padding: 8px 16px;
      font-size: 14px;
      `;
    break;
    default:
      return `
      padding: 12px 20px;
      font-size: 17px; 
      `
    break;
  }

}}

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
@media (hover: hover) {
  &:hover:before
  {
    opacity:1;
    left:0%;
    width:100%;
  }
}
&:active:before
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
      @media (hover: hover) {
        &:hover
        {
          color: ${fgHoverColor};
        }
      }
      &:active
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
      @media (hover: hover) {
        &:hover
        {
          color: ${fgHoverColor};
        }
      }
      &:active
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
//padding: 8px 16px;
//    font-size: 14px;
export interface ButtonProps {
    children?:React.ReactNode,
    label:string,
    className?:string,
    onClick?(event:HammerInput):any,
    onClickOutside?(event:React.MouseEvent):any,
    onMouseDown?(event:React.MouseEvent):any,
    type?:('button'|'submit'),
    selected?:boolean,
    bgHoverColor?:string,
    fgHoverColor?:string,
    bgColor?:string,
    fgColor?:string,
    iconRight?:React.ReactNode,
    iconLeft?:React.ReactNode,
    styleType?:('unlevated' | 'outlined' | 'flat'),
    size?:('small'|'default'),
    style?:CSSProperties,
    disabled?:boolean
}

export default function WButton(props:ButtonProps) {


  return (
    <OutsideClickHandler onOutsideClick={(e)=>props.onClickOutside?.(e)}>
      <Container style={props.style} className={props.className}>
        <Hammer onTap={props.onClick}>
          <StyledButton disabled={props.disabled} size={props.size} fgColor={props.fgColor} bgColor={props.bgColor} fgHoverColor={props.fgHoverColor} bgHoverColor={props.bgHoverColor}  styleType={props.styleType} selected={props.selected} type={props.type || 'button'} onMouseDown={props.onMouseDown} >
            <ButtonLabel withIcon={Boolean(props.iconLeft || props.iconRight)}>
              {props.iconLeft}
              {props.label}
              {props.iconRight}
            </ButtonLabel>
          </StyledButton>
        </Hammer>
        {props.children}
      </Container>
    </OutsideClickHandler>
  );
}


