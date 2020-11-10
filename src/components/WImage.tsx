import React from 'react';
import styled from 'styled-components';


interface ImageContainerStyle{
    elevated?:boolean
}

interface ImageStyle
{
  width?:string,
  height?:string
}

const ImageContainer = styled.figure<ImageContainerStyle>`
margin:0;
padding:0;
box-shadow: ${props => props.elevated ? '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.4)':'none'};
`;
const Image = styled.img<ImageStyle>`

    width:${props => props.width ? props.width : '100%'};
    height:${props => props.height ? props.height : 'auto'};
    display:block;
`;

interface ImageProps{
    src:string,
    elevated?:boolean,
    width?:string,
    height?:string
}

export default function WImage(props:ImageProps) {

    return (
        <ImageContainer elevated={props.elevated} >
            <Image height={props.height} width={props.width} src={props.src} />
        </ImageContainer>
    )
}

