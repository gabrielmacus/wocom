import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import {ValidationError, ValidationSchema} from 'fastest-validator';
import { FormContext } from './WForm';
import WValidationErrors from './WValidationErrors';
import FastestValidator from 'fastest-validator';
import _ from 'lodash';


export interface ContainerStyleProps
{
  inline?:boolean
}

const Label = styled.label`
box-sizing:border-box;
font-size: 16px;
color: #555;
display: block;
margin-bottom: 5px;
`

const Container = styled.div<ContainerStyleProps>`
position:relative;
display:${props => props.inline ? 'flex':'block' };
align-items:center;
& > ${Label}
{
  margin-right:10px;
}

`;


export interface FieldProps {
    children?:React.ReactNode,
    className?:string,
    label?:string,
    rules?:ValidationSchema<any>,
    value?:any,
    validationType?:string,
    validationErrorPosition?:('left'|'right'),
    inline?:boolean,
    labelId:string,
    customValidationStatus?: ValidationError[] | true | undefined
}


export default function WField(props:FieldProps) {
  const validator = new FastestValidator({
    messages:{
      required:'Campo requerido',
      stringMax:'Ingrese máximo {expected} caracteres',
      stringMin:'Ingrese mínimo {expected} caracteres',
      numberMax:'Ingrese un valor menor o igual a {expected}',
      numberMin:'Ingrese un valor mayor o igual a {expected}',
      numberPositive:'Ingrese un valor positivo',
      number:'Ingrese un número',
      arrayMin:'El campo debe contener al menos {expected} elemento/s',
      arrayMax:'El campo debe contener {expected} o menos elementos',
    }
  });
  const formContext = useContext(FormContext);
  const [validationStatus, setValidationStatus] = useState<ValidationError[] | true | undefined>();
  const [lastValue, setLastValue] = useState<any>()
  const didMountRef = useRef(false);

  //const [value, setValue]  = useState<any>(null);

  function validate():(true | ValidationError[])
  {
    let value = props.value;
    let rules = props.rules;

    if(rules && typeof value !== "undefined")
    {

      /*
      if(typeof value !== "object" || value === null)
      {
        rules.convert = true;
      }*/
      rules.convert = true;
      rules.$$root = true;
      if(props.validationType)
      {
        rules.type = props.validationType;
      }


      const check = validator.compile(rules);
      const status = check(value);

      setValidationStatus(status);
      return status;

    }
    else
    {
      return true;
    }
  }
  useEffect(()=>{

    formContext?.setFormField(props.labelId,validate);
    if(didMountRef.current)
    {

      if(!_.isEqual(lastValue,props.value))
      {
        validate();
      }
    }
    else
    {
      didMountRef.current = true;
    }
    setLastValue(props.value);
  },[props.value]);

  return (
    <Container inline={props.inline} className={props.className}>
      {props.label && <Label  id={props.labelId}>{props.label}</Label>}
      {props.children}
      <WValidationErrors position={props.validationErrorPosition} validationStatus={typeof props.customValidationStatus !== 'undefined' ? props.customValidationStatus : validationStatus}></WValidationErrors>
    </Container>
  );
}

