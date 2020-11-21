import React, { ChangeEvent, useState, FocusEvent, useEffect,useRef } from 'react'
import styled from 'styled-components'
import WField,{FieldProps} from './WField';
import { useId } from "react-id-generator";
import MaskedInput,{maskArray} from 'react-text-mask';


export const Input = styled.input`
display:block;
outline: none;
margin: 0;
border: none;
width: 100%;
line-height: 50px;
background: #fafafa;
box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
border-radius: 5px;
padding: 0 20px;
font-size: 16px;
color: #666;
box-sizing:border-box;
`;


//https://stackoverflow.com/questions/55776961/styled-components-extend-styles-and-change-element-type
const Textarea = styled(Input).attrs({as:"textarea"})`
height:150px;
resize:none;
line-height: 20px;
padding-top:15px;
padding-bottom:15px;
`;

interface TextFieldProps extends Omit<FieldProps, 'children' | 'labelId'>
{
    debounce?:number,
    type?:('text'|'number')
    textarea?:boolean,
    validateOnBlur?:boolean,
    onChange?:(value:(string|number|null)) => void,
    maskOptions?:{mask:boolean | (string|RegExp)[]| ((value:string) => maskArray),guide?:boolean}
}


export default function WTextField(props:TextFieldProps) {
  const [value,setValue] = useState<string | number | null>(typeof props.value !== "undefined" ? props.value : null);
  const [htmlId] = useId();
  let debounceTimeout = useRef<ReturnType<typeof setTimeout> | undefined>();

  function onBlur(event:FocusEvent<HTMLInputElement>)
  {
    if(props.validateOnBlur)
    {
      if(event.target.value == "")
      {
        setValue(null);
        return;
      }
      setValue(event.target.value);
      //setValue(props.type == 'number' ? parseFloat(event.target.value) : event.target.value);
    }
  }
  function onChange(event:ChangeEvent<HTMLInputElement>)
  {
    if(props.debounce)
    {
      if(debounceTimeout.current)
      {
        clearTimeout(debounceTimeout.current);
      }
      let {target} = event;
      debounceTimeout.current = setTimeout(function (){
        props.onChange?.(target.value === "" ? null : target.value);
      },props.debounce);

    }
    else
    {
      props.onChange?.(event.target.value === "" ? null : event.target.value);
    }

    if(!props.validateOnBlur)
    {
      if(event.target.value == "")
      {
        setValue(null);
        return;
      }
      setValue(event.target.value);
      //setValue(props.type == 'number' ? parseFloat(event.target.value) : event.target.value);
    }
  }

  useEffect(()=>{
    setValue(props.value);
  },[props.value]);


  return (
          <WField customValidationStatus={props.customValidationStatus} labelId={htmlId} value={value} inline={props.inline} validationType={props.type || props.validationType || 'string'}  rules={props.rules} label={props.label}>
            {!props.textarea?
            !props.maskOptions ?
            <Input value={value || ''} aria-labelledby={htmlId} onBlur={onBlur} type={props.type || 'text'} onChange={onChange} /> :
            <Input
              value={value || ''}
              as={MaskedInput}
              mask={props.maskOptions.mask}
              guide={props.maskOptions.guide}
              aria-labelledby={htmlId}
              onBlur={onBlur}
              onChange={onChange}
            />
            :
            <Textarea  value={value || ''} aria-labelledby={htmlId} onBlur={onBlur} onChange={onChange} />
            }
          </WField>
  );
}

