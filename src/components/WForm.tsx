import { ValidationError } from 'fastest-validator';
import React, { createContext, FormEvent, useRef,  } from 'react';
import styled from 'styled-components'

const Form = styled.form`
position:relative;
width:100%;
display:grid;
grid-template-columns:1fr;
grid-gap:1.5rem;
`;


export interface FormProps {
    children:React.ReactNode,
    className?:string,
    onSubmit?(event:FormEvent):any,
}



//export const FormContext = createContext<{setValidationStatus(fieldLabel:string, validationStatus:(undefined | true | ValidationError[])):any} | undefined>(undefined);//createContext<Partial<SelectFieldOptionProps>>({});
export const FormContext = createContext< {setFormField:(fieldLabel:string,validate:()=>true | ValidationError[])=>void} | undefined >(undefined);//createContext<Partial<SelectFieldOptionProps>>({});

export default function WField(props:FormProps) {

  //const [formFields, setFormFields] = useState<{[key: string]: {validate:()=>true | ValidationError[]} }>({});
  let formFields = useRef<{ [key:string] : {validate():true | ValidationError[]} }>({});

  function onSubmit(event:FormEvent)
  {
    event.preventDefault();
    let validationError = false;
    for(const key in formFields.current)
    {
      let field = formFields.current[key];
      let validationStatus =  field.validate();
      if(validationStatus !== true)
      {
        validationError = true;
      }
    }
    if(!validationError)
    {
      props.onSubmit?.(event);
    }
  }


  function setFormField(fieldLabel:string,validate:()=>true | ValidationError[]):void
  {
    formFields.current[fieldLabel] = {validate};
  }

  return (
    <FormContext.Provider value={{setFormField}}>
      <Form onSubmit={onSubmit} className={props.className}>
        {props.children}
      </Form>
    </FormContext.Provider>

  );
}

