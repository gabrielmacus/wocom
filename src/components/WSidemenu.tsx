import React from 'react';
import styled from 'styled-components';

const Sidemenu = styled.div`
color:white;
font-weight:bold;
`;

const MenuItem = styled.div`
padding:20px;
padding-top:15px;
padding-bottom:15px;
&:hover{
background-color:#6956c4;
}
cursor:pointer;
transition:all 0.2s;
`;
/*
* &:after
{
content:'';
height:1px;
display:block;
width:calc(100% - 40px);
background-color:#8677d9;
margin-left:auto;
}
* */
const ItemLink = styled.a`
color:inherit;
text-decoration:none;
display:block;
`;

interface MenuItemStandard {
  href:string,
  label:string
}

interface MenuItemCustom {
  element:React.ReactNode
}


type MenuItemProps = MenuItemStandard | MenuItemCustom;


interface WSidemenuProps
{
    //children:React.ReactNode
  items:MenuItemProps[]
}

export default function WSidemenu(props:WSidemenuProps) {
    return (
        <Sidemenu>
            {props.items.map((item: MenuItemProps) =>
              <MenuItem>
                {'element' in item && item.element}
                {'label' in item &&
                  <ItemLink href={item.href}>{item.label}</ItemLink>
                }
              </MenuItem>
            )}
        </Sidemenu>
    )
}

