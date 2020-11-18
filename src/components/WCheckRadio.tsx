import React, {  useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import WField, { FieldProps} from './WField';
import { useId } from "react-id-generator";

const CheckRadio = styled.div`
user-select:none;
display: flex;
align-items: center;
display: flex;
align-items: center;
font-size: 25px;
position:relative;
cursor:pointer;
& > :first-child
{
opacity:0;
}
& > :nth-child(2),& > :nth-child(3)
{
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
}
`;

interface ValidationErrorsProps extends Omit<FieldProps,'children'|'value'|'labelId'>
{
    type:('radio'|'checkbox'),
    onValue?:any,
    offValue?:any,
    checked?:boolean,
    onChange?:(value:any)=>any
}

export default function WCheckRadio(props:ValidationErrorsProps) {
    const [value, setValue] = useState();
    const [htmlId] = useId();

    function getOnValue()
    {
        return props.onValue || true;
    }
    function getOffValue()
    {
        return props.offValue || false;
    }

    function getValueType()
    {
        return typeof getOnValue();
    }

    useEffect(()=>{
        if(props.checked)
        {
            setValue(getOnValue());
        }
        else
        {
            setValue(getOffValue());
        }
    },[props.checked]);

    function onChange()
    {

        if(value == getOnValue())
        {
            setValue(getOffValue());
            props.onChange?.(getOffValue());
        }
        else
        {
            setValue(getOnValue());
            props.onChange?.(getOnValue());
        }
    }

    return (
        <WField labelId={htmlId} rules={props.rules} validationType={props.validationType || getValueType() } validationErrorPosition="left" inline={true} label={props.label}>
            <CheckRadio id={htmlId} onClick={onChange}>
                <FontAwesomeIcon icon={faCheckSquare} />
                {value == getOnValue()?
                    <FontAwesomeIcon icon={faCheckSquare} /> :
                    <FontAwesomeIcon icon={faSquare}  />
                }

            </CheckRadio>
        </WField>
    )
}

