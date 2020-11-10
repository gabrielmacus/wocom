import React, { useState,useEffect } from 'react';
import styled from 'styled-components'
import WField,{FieldProps} from './WField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useId } from "react-id-generator";

export interface ImageStyleProps
{
    selected?:boolean
}

export const RatingInput =  styled.div`
width:100%;
padding-top:15px;
padding-bottom:15px;
`;

export const RatingContainer = styled.div`
display:flex;
align-items:center;
max-width:275px;
width:100%;
`;
export const Image = styled.img<ImageStyleProps>`
align-items: center;
display: flex;
width:100%;
height:auto;
filter: grayscale(${props => props.selected ? 0 : 1});
transition:all 0.2s;
`;

export const RatingItem = styled.figure`
flex:1;
padding: 0;
position:relative;
margin: 0;
cursor:pointer;

${Image}:nth-child(1)
{
    opacity:0;
}
${Image}:nth-child(2)
{
    position: absolute;
    left: 0;
    top:0;
    width: 50%;
    height: 100%;
    object-fit: cover;
    object-position: left;
}
${Image}:nth-child(3)
{
    
    top:0;
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    object-fit: cover;
    object-position: right;
}

`;
const ResetRating = styled.div`
cursor:pointer;
height:100%;
display:block;
font-size: 20px;
margin-left: 15px;
`;

interface RatingFieldProps extends Omit<FieldProps, 'children'|'validationType'|'labelId'>
{
    onChange?:(value:number) => void,
    ratingItem?:string,
    max?:number
}


export default function WRatingField(props:RatingFieldProps) {
    const [value,setValue] = useState<number>(0);
    const [tmpValue, setTmpValue] = useState<number>(0);
    const [htmlId] = useId();
    const [ratingItem, setRatingItem] = useState(props.ratingItem);

    useEffect(()=>{
        if(!ratingItem)
        {
            setRatingItem(`
            data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTMuODY3IDUzLjg2NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTMuODY3IDUzLjg2NzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0VGQ0U0QTsiIHBvaW50cz0iMjYuOTM0LDEuMzE4IDM1LjI1NiwxOC4xODIgNTMuODY3LDIwLjg4NyA0MC40LDM0LjAxMyA0My41NzksNTIuNTQ5IDI2LjkzNCw0My43OTggDQoJMTAuMjg4LDUyLjU0OSAxMy40NjcsMzQuMDEzIDAsMjAuODg3IDE4LjYxMSwxOC4xODIgIi8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==            `);
        }
    },[]);

    function iterationArray()
    {
        let arr = [];
        for(let i = 1 ; i<=(props.max || 5) ; i++)
        {
            arr.push(i);
        }
        return arr;
    }


    function onChange(){
        setValue(tmpValue);
        props.onChange?.(tmpValue);
    }

    function resetRating()
    {
        setValue(0);
        setTmpValue(0);
    }

    return (
            <WField customValidationStatus={props.customValidationStatus} labelId={htmlId} validationErrorPosition={'left'} value={value} validationType={'number'}  rules={props.rules} label={props.label}>
                <RatingInput id={htmlId}>
                    <RatingContainer >
                        {iterationArray().map((i) =>
                            <RatingItem key={i}>
                                    <Image src={ratingItem} />

                                    <Image selected={(i-0.5) <= tmpValue} onClick={onChange} onMouseLeave={()=>{setTmpValue(value)}} onMouseOver={()=>{setTmpValue(i - 0.5)}} src={ratingItem} />
                                    <Image selected={i <= tmpValue}  onClick={onChange} onMouseLeave={()=>{setTmpValue(value)}} onMouseOver={()=>{setTmpValue(i)}} src={ratingItem} />

                            </RatingItem>
                        )}
                        <ResetRating onClick={resetRating}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></ResetRating>
                    </RatingContainer>
                </RatingInput>
            </WField>
    );
}

