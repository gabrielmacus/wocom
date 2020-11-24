import React, { createContext,useState, useRef,useEffect  } from 'react';
import styled from 'styled-components'
import Field,{FieldProps } from './WField';
import {SelectOptionEvent, SelectOption} from './WSelectFieldOption';
import {Input} from './WTextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import OutsideClickHandler from 'react-outside-click-handler';
import { useId } from "react-id-generator";


const Select = styled(Input).attrs({as:'div'})`
height:50px;
cursor:pointer;
user-select:none;
`;

const SelectPlaceholder = styled.div`
display: flex;
justify-content: space-between;
align-items:center;
color:#9e9e9e;
`;

const SelectOptions = styled.div`
z-index:500;
position: absolute;
left: 0;
right: 0;
max-height:200px;
overflow:auto;
background: #fafafa;
box-shadow: 0 1px 10px rgba(0,0,0,0.1), 0 1px 10px rgba(0,0,0,0.08);
`;

const Selected = styled.div`
display:flex;
font-weight:600;`;

const SelectedOption = styled.div`
&:not(:last-child)
{
    margin-right:5px;
}
& > span
{
    background:white;
    padding:5px;
    box-shadow: 0 1px 10px rgba(0,0,0,0.1), 0 1px 10px rgba(0,0,0,0.08);
    border-radius:5px;
}
`;

interface SelectFieldProps extends Omit<FieldProps,'validationType'|'labelId'|'value'>
{
    multiple?:boolean,
    //selectedValue?:any,
    onChange?(value:any):any
}

export interface SelectFieldContextProps 
{
    selectOption:SelectOptionEvent,
    multiple?:boolean, 
    selected:any
} 

export const SelectFieldContext = createContext<SelectFieldContextProps | undefined>(undefined);//createContext<Partial<SelectFieldOptionProps>>({});

export default function SelectField(props:SelectFieldProps) {
    const [optionsOpened, setOptionsOpened] = useState(false);
    //props.selectedValue?props.selectedValue : []
    const [selected, setSelected] = useState<{label:string,value:any}[]>([]);
    const didMountRef = useRef(false);
    const [htmlId] = useId();

    function selectOption(option:SelectOption,event?:React.MouseEvent) {

        if(props.multiple)
        {
            let valueIndex = selected.findIndex((o:SelectOption) => o.value == option.value);
            if(valueIndex > -1)
            {
                if(event)
                {
                setSelected(selected.filter((o: SelectOption) => o.value != option.value));
                }
            }
            else
            {
                setSelected(selected.concat([option]));
            }
        }
        else{
            setSelected([option]);
            if(event)
            setOptionsOpened(false);
        }
    }


    function isSelectedEmpty()
    {
        return selected.length == 0;
    }

    function getSelectedValue()
    {
        if(props.multiple)
        {
            return selected.map(option => option.value);
        }
        else
        {
            return selected.length > 0 ? selected[0].value : null;
        }
    }

    useEffect(()=>{
        if (didMountRef.current)
        {
            props.onChange?.(getSelectedValue());
        }
        else
        {
            didMountRef.current = true;
        }
    },[selected]);

    return (

    <Field customValidationStatus={props.customValidationStatus} labelId={htmlId} value={getSelectedValue()} rules={props.rules}  label={props.label}>

        <OutsideClickHandler
        onOutsideClick={() => setOptionsOpened(false)}
        >
            <Select id={htmlId} >
            <SelectPlaceholder onClick={()=>{setOptionsOpened(!optionsOpened);}}>
                {isSelectedEmpty()?
                <React.Fragment>Seleccione una opción</React.Fragment>:
                <React.Fragment>
                    {props.multiple ?
                    <Selected>
                        {selected.map((o:any) => <SelectedOption key={o.value}><span>{o.label}</span></SelectedOption>)}
                    </Selected>
                    :
                    <Selected key={selected[0].value}>{selected[0].label}</Selected>
                    }
                </React.Fragment>
                }
                <FontAwesomeIcon style={{transform:optionsOpened?'rotate(180deg)':''}} icon={faCaretDown} />
            </SelectPlaceholder>

            <SelectOptions style={{display:optionsOpened ? 'block':'none'}} >
                <SelectFieldContext.Provider value={{selectOption,multiple:props.multiple,selected}} >
                    {props.children}
                </SelectFieldContext.Provider>
            </SelectOptions>
            
            </Select>
       </OutsideClickHandler>

    </Field>
  );
}

