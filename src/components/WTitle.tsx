import React from 'react';
import styled from 'styled-components';

interface TitleStyleProps
{
    level:number,
    borderBottom?:boolean
}

const Title = styled.div<TitleStyleProps>`
font-weight: 600;
margin-bottom: 20px;
${props => props.borderBottom ? `border-bottom: 2px solid;padding-bottom: 15px;` : ''}
${
    props => {

        switch(props.level){
            case 2:
                return `
                color: #757575;
                font-size:25px;
                `;
            break;
            default:
                return `font-size:30px;`;
            break;
        }

    }
}
`;

interface WTitleProps
{
    children:React.ReactNode,
    level?:number,
    borderBottom?:boolean
}

export default function WTitle(props:WTitleProps) {

    return (
        <Title level={props.level || 1} borderBottom={props.borderBottom} role="Title">
            {props.children}
        </Title>
    )
}

