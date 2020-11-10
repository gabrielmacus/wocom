import React, {  MouseEvent } from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import {SelectFieldContext} from './WSelectField';
import _ from 'lodash';

interface OptionProps {
    selected: boolean
  };

const Option = styled.div<OptionProps>`
line-height: initial;
padding-left:16px;
padding-right:16px;
padding-top:12px;
padding-bottom:12px;
transition:background-color 0.2s;
background-color:${(props)=>props.selected ?"#e0e0e0":"inherit"};
justify-content:space-between;
display:flex;
&:hover
{
    background-color:#039be5;
    color:white;
}
& > .icon
{
  display:${(props)=>props.selected ?"block ":"none"};
}
`;

export type SelectOption = {label:string, value:any};

export type SelectOptionClick = (option:SelectOption,event?:MouseEvent) => any

interface SelectFieldOptionProps
{
    //children:React.ReactNode,
    label:string,
    onClick?:SelectOptionClick,
    value:any
}

export default function WSelectFieldOption(props:SelectFieldOptionProps) {

  function isSelected(multiple:(boolean|undefined),selected:any):boolean
  {
    if(!selected)
    {
      return false;
    }
    
    if(multiple)
    {
      return selected.findIndex((option: SelectOption) => option.value == props.value) > -1;
    }
    else
    {
      
      return selected.value == props.value;
    }
    
  }
  return (
      <SelectFieldContext.Consumer>
          {
            context =>
            <Option 
            selected={isSelected(context?.multiple,context?.selected)}
            onClick={(event)=>{ props.onClick?.({value:props.value,label:props.label},event); context?.onClick({value:props.value,label:props.label},event);}} >
            {props.label} <FontAwesomeIcon className="icon" icon={faCheck} /> 
            </Option>
          }
      </SelectFieldContext.Consumer>
  );
}

