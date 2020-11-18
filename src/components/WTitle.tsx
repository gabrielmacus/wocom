import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
font-size: 30px;
font-weight: 600;
margin-bottom: 20px;
`;

interface WTitleProps
{
    children:React.ReactNode
}

export default function WTitle(props:WTitleProps) {

    return (
        <Title role="Title">
            {props.children}
        </Title>
    )
}

