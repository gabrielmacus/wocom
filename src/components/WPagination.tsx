import React, {  } from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

export interface PageNumberStyleProps
{
    active?:boolean
}

export interface PaginationArrowStyleProps
{
    disabled?:boolean
}

const Pagination = styled.div`
position: relative;
width: 100%;
display: block;
box-shadow: 0 4px 6px 0 rgba(0,0,0,0.3);
font-size: 18px;
justify-content: center;
display: flex;
align-items: center;
background-color: #2c63ff;
color: white;
border-radius: 4px;
`;

const PaginationControl = styled.div`
padding:12px;
padding-left:15px;
padding-right:15px;
cursor:pointer;
&:hover
{
    background-color:#2d59d6;
}
transition:all 0.2s;
`;

/*
    opacity: 0.5;
    pointer-events: none;
*/
const PaginationArrow = styled(PaginationControl)<PaginationArrowStyleProps>`
${props => props.disabled && `
opacity:0.5;
pointer-events:none;
`}
}

`;

const PageNumber = styled(PaginationControl)<PageNumberStyleProps>`
background-color:${props => props.active ? '#26418f':'inherit'};
`;


export interface PaginationProps {
    className?:string,
    totalPages:number,
    page:number,
    padding?:number,
    onClickPage:(page:number) => any

}
  


export default function WPagination(props:PaginationProps) {
  
  function getPagesArray():number[]
  {
    let padding = props.padding || 2;
    let pages = [];

    let offsetRight =  (props.page + padding ) - props.totalPages;
    offsetRight = offsetRight > 0 ? offsetRight : 0;

    let offsetLeft = (padding - (props.page - 1));
    offsetLeft = offsetLeft > 0 ? offsetLeft : 0;

    for(let i = props.page - padding - offsetRight; i <= props.page + padding + offsetLeft ; i++ )
    {
      if(i > 0 && i <= props.totalPages)
      {
        pages.push(i);
      }
    }

    return pages;
  }
    
  return (
    <Pagination className={props.className}>
        <PaginationArrow onClick={()=> props.onClickPage(props.page - 1)} disabled={props.page == 1}><FontAwesomeIcon icon={faChevronCircleLeft} /></PaginationArrow>
        {getPagesArray().map((page) =>
          <PageNumber onClick={()=> props.onClickPage(page)} key={`pagination-${page}`} active={page == props.page}>{page}</PageNumber>
        )}
        <PaginationArrow onClick={()=> props.onClickPage(props.page + 1)} disabled={props.page == props.totalPages}><FontAwesomeIcon icon={faChevronCircleRight} /></PaginationArrow>
    </Pagination>
    
  );
}

