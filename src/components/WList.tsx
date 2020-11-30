import React from 'react';
import styled from 'styled-components';


export interface ListItem
{
  label:string,
  icon?:React.ReactNode,
  onClick?:()=>any,
  selected?:boolean
}

export interface ListItemStyleProps
{
  selected?:boolean
}

const List = styled.div`
background-color: #f5f5f5;
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
min-width: 150px;
border-radius: 5px;
`;

const ListItem = styled.div<ListItemStyleProps>`
display: flex;
justify-content: space-between;
align-items: center;

padding: 12px;
padding-left:15px;
border-bottom: 1px solid #e0e0e0;
transition:all 0.2s;
cursor:pointer;
text-align:left;
background-color:${props => props.selected ? '#e0e0e0':'inherit'};
@media (hover: hover) {
&:hover
{
background-color:#e0e0e0;
}
}
`;

interface WList
{
  listItems:ListItem[]
}

export default function WTitle(props:WList) {

  return (
    <List>
      {props.listItems.map(listItem =>
        <ListItem key={listItem.label} selected={listItem.selected} onClick={listItem.onClick}>{listItem.label}{listItem.icon}</ListItem>
      )}
    </List>
  )
}

