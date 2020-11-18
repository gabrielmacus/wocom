import React, { useState } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

interface SubmenuStyleProps
{
  opened?:boolean
}

const Sidemenu = styled.div`
color:white;
font-weight:bold;
user-select:none;
`;

const MenuItem = styled.div`
& > a
{
  color:inherit;
  text-decoration:none;
  display:block;
  position:relative;
  padding:20px;
  padding-top:15px;
  padding-bottom:15px;
  &:hover{
  color:${props => props.theme.primaryLight1Foreground};
  background-color:${props => props.theme.primaryLight1Background};
  }
  cursor:pointer;
  width:100%;
  transition:all 0.2s;
}
display:flex;
flex-wrap:wrap;
order:1;
width:100%;
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
`;

const Submenu = styled.div<SubmenuStyleProps>`
background: ${props => props.theme.primaryLight2Background};
color: ${props => props.theme.primaryLight2Foreground};
width:100%;
order:1;
${ItemLink}
{
  &:hover
  {
    background-color:${props => props.theme.primaryLight1Foreground};
    color:${props => props.theme.primaryLight1Background};
  }
}

${props => props.opened ? `
display:block;
& + ${ItemLink}
{
  color:${props.theme.primaryLight1Foreground};
  background-color:${props.theme.primaryLight1Background};
}
`: 
'display:none;'}
`;



interface MenuItemStandard {
  href:string,
  label:string,
  items?: MenuItemProps[]
}

interface MenuItemCustom {
  element:React.ReactNode,
  items?: MenuItemProps[]
}



type MenuItemProps = MenuItemStandard | MenuItemCustom;


interface WSidemenuProps
{
    //children:React.ReactNode
  items:MenuItemProps[]
}

export default function WSidemenu(props:WSidemenuProps) {

    const [itemLinks, setItemLinks] = useState< {[key:number]:boolean}  >({});

    return (
        <Sidemenu>
            {props.items.map((item: MenuItemProps,key:number) =>
              <MenuItem key={key}>
                {item.items &&
                <Submenu opened={itemLinks[key]}>
                  {item.items.map((item,key) =>
                    <MenuItem key={key}>
                      {'element' in item && item.element}
                      {'label' in item &&
                      <ItemLink  href={item.href}>{item.label}</ItemLink>
                      }
                    </MenuItem>
                  )}
                </Submenu>
                }
                {'element' in item && item.element}
                {'label' in item &&
                  <ItemLink href={!item.items ? item.href : undefined}
                            onClick={!item.items ? undefined : () => setItemLinks({...itemLinks,...{[key]:!itemLinks[key]}})}
                  >
                    {item.label}
                    {item.items && <FontAwesomeIcon style={{marginLeft:'15px'}} icon={itemLinks[key] ? faCaretUp : faCaretDown } />}
                  </ItemLink>
                }


              </MenuItem>
            )}
        </Sidemenu>
    )
}

