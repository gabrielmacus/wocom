import { ValidationError } from 'fastest-validator';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

export interface ErrorsStyleProps
{
    position?:('left'|'right')
}

export const Errors = styled.div<ErrorsStyleProps>`
position: absolute;
bottom: 0;
transform: translateY(100%);
z-index: 100;
${props => props.position == 'left' 
?
`left: 0.5rem;`:
`right: 0.5rem;`}

font-weight:bold;
font-size: 0.8rem;
border-radius: 7px;
box-shadow:0 0 10px rgba(0, 0, 0, 0.25);
padding: 0.5rem;
background:white;
color:black;
display:grid;
grid-gap:0.25rem;

`;

export const Triangle = styled.div`
width: 0;
top:0;
height: 0;
border-left: 10px solid transparent;
border-right: 10px solid transparent;
border-bottom: 10px solid white;
position: absolute;
left: 15px;
transform: translateY(-85%);

`;

export const Error = styled.div`

`;


interface ValidationErrorsProps
{
 validationStatus:ValidationError[] | true | undefined,
 position?:('left'|'right')
}

export default function WValidationErrors(props:ValidationErrorsProps) {
    return (<React.Fragment>{typeof props.validationStatus !== "undefined" && props.validationStatus !== true && 

    <Errors data-testid="validation-errors" position={props.position}>
        <Triangle />
        {props.validationStatus.map((error:ValidationError,index:number)=>{
            return (
                <Error data-testid="validation-error" key={index}><FontAwesomeIcon style={{marginRight:'5px',color:'#fbc02d'}} icon={faExclamationTriangle}/>{error.message}</Error>
            )
        })}
    </Errors>
    
    }</React.Fragment>)
}

