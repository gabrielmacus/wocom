import React, {  useEffect,useContext } from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import {SelectFieldContext,SelectFieldContextProps} from './WSelectField';
import _ from 'lodash';
import Hammer from 'react-hammerjs';

interface OptionProps {
    selected: boolean
  };

const Option = styled.div<OptionProps>`
user-select:none;
line-height: initial;
padding-left:16px;
padding-right:16px;
padding-top:12px;
padding-bottom:12px;
transition:background-color 0.2s;
background-color:${(props)=>props.selected ?"#e0e0e0":"inherit"};
justify-content:space-between;
display:flex;
@media (hover: hover) {
&:hover
{
    background-color:#039be5;
    color:white;
}
}
& > .icon
{
  display:${(props)=>props.selected ?"block ":"none"};
}
`;

export type SelectOption = {label:string, value:any};

export type SelectOptionEvent = (option:SelectOption,event?:HammerInput) => any

interface SelectFieldOptionProps
{
    //children:React.ReactNode,
    label:string,
    onClick?:SelectOptionEvent,
    value:any,
    selected?:boolean
}

export default function WSelectFieldOption(props:SelectFieldOptionProps) {
  const context = useContext<SelectFieldContextProps | undefined>(SelectFieldContext);

  
  function isSelected(/*multiple:(boolean|undefined),*/selected:any):boolean
  { 
    if(!selected)
    {
      return false;
    }
    
    return selected.findIndex((option: SelectOption) => option.value == props.value) > -1;
    /*
    if(multiple)
    {
      return selected.findIndex((option: SelectOption) => option.value == props.value) > -1;
    }
    else
    {
      
      return selected.value == props.value;
    }*/
    
  }
  
  useEffect(()=>{
    if(props.selected)
    context?.selectOption({value:props.value,label:props.label});
  },[props.selected]);

  useEffect(()=>{
    if(props.selected)
    context?.selectOption({value:props.value,label:props.label});
  },[])
  
  return (
      <React.Fragment>
      <Hammer
        onTap={(event)=>{ props.onClick?.({value:props.value,label:props.label},event); context?.selectOption({value:props.value,label:props.label},event);}}
        >
        <Option 
          selected={Boolean(isSelected(context?.selected))} >
          {props.label} <FontAwesomeIcon className="icon" icon={faCheck} /> 
        </Option>
      </Hammer>
      {/*
      <SelectFieldContext.Consumer>
          {
            context =>
            <Option 
            selected={isSelected(context?.multiple,context?.selected)}
            onClick={(event)=>{ props.onClick?.({value:props.value,label:props.label},event); context?.selectOption({value:props.value,label:props.label},event);}} >
            {props.label} <FontAwesomeIcon className="icon" icon={faCheck} /> 
            </Option>
          }
      </SelectFieldContext.Consumer>
      
      */}
      </React.Fragment>
  );
}

