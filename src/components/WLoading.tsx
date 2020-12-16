import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0,0,0,0.75);
z-index: 10000;
display: flex;
align-items: center;
justify-content: center;
`;

const Loading = styled.div``;

const LoadingText = styled.div`
color: white;
font-weight: 600;
margin-top: 20px;
font-size: 20px;
`;

interface WLoadingProps
{
    text?:string,
    show?:boolean
}

export default function WLoading(props:WLoadingProps) {

    return (
        <React.Fragment>
            {props.show &&
            <LoadingContainer>
                <Loading>
                    <svg style={{margin:'auto',background:'none',display:'block',shapeRendering:'auto'}} width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.5555555555555556s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                    </circle>
                    </svg>

                    {props.text && <LoadingText>{props.text}</LoadingText>}
                </Loading>
            </LoadingContainer>
            }
        </React.Fragment>
    )
}

