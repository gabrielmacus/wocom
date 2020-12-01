import React, { useState } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Hammer from 'react-hammerjs';

interface SubmenuStyleProps
{
  opened?:boolean
}

interface MenuItemStyleProps
{
  active?:boolean
}

const Sidemenu = styled.div`
color:white;
font-weight:bold;
user-select:none;
`;

const MenuItem = styled.div<MenuItemStyleProps>`
color: ${props => props.theme.primaryForeground};
& > a
{
  color:inherit;
  text-decoration:none;
  display:block;
  position:relative;
  padding:30px;
  padding-top:15px;
  padding-bottom:15px;
  display: flex;
  justify-content: space-between;
  @media (hover: hover) {
    &:hover{
      color:white;
      background-color:#363e47;
    }
  }

  ${props => {

    return props.active ? `
    color:white;
    background-color:#363e47;
    `:'';

  }}

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
  @media (hover: hover) {
  &:hover
  {
    background-color:${props => props.theme.primaryLight1Foreground};
    color:${props => props.theme.primaryLight1Background};
  }
  }
}

${props => props.opened ? `
display:block;
& + ${ItemLink}
{
 
}
`: 
'display:none;'}
`;

const MenuItemIcon = styled.div``;


interface MenuItemStandard {
  href:string,
  label:string,
  items?: MenuItemProps[],
  active?:boolean,
  icon?:React.ReactNode
}

interface MenuItemCustom {
  element:React.ReactNode,
  items?: MenuItemProps[],
  active?:boolean,
  icon?:React.ReactNode
}



type MenuItemProps = MenuItemStandard | MenuItemCustom;


interface WSidemenuProps
{
    //children:React.ReactNode
  items:MenuItemProps[]
}

export default function WSidemenu(props:WSidemenuProps) {

    const [itemLinks, setItemLinks] = useState< {[key:number]:boolean}  >({});

    function onClickMenuItem(item:MenuItemProps,key:number){
      if(item.items){
        setItemLinks({...itemLinks,...{[key]:!itemLinks[key]}});
      }
      else if((item as MenuItemStandard).href)
      {
        window.location.href = (item as MenuItemStandard).href;
      }
    }
    function onClickSubmenuItem(item:MenuItemStandard)
    {
      window.location.href = item.href;
    }

    return (
        <Sidemenu>
            {props.items.map((item: MenuItemProps,key:number) =>
              <MenuItem active={item.active} key={key}>
                {item.items &&
                <Submenu opened={itemLinks[key]}>
                  {item.items.map((item,key) =>
                    <MenuItem  active={item.active} key={key}>
                      {'element' in item && item.element}
                      {'label' in item &&
                      <Hammer onTap={()=>onClickSubmenuItem(item)}><ItemLink>{item.label} {item.icon}</ItemLink></Hammer>
                      }
                    </MenuItem>
                  )}
                </Submenu>
                }
                {'element' in item && item.element}
                {/*href={!item.items ? item.href : undefined} */}
                {'label' in item &&
                  <Hammer onTap={()=>onClickMenuItem(item,key)}>
                    <ItemLink 
                    >
                      {item.label}
                      <MenuItemIcon>
                        {item.items && <FontAwesomeIcon style={{marginRight:'15px'}} icon={itemLinks[key] ? faCaretUp : faCaretDown } />}
                        {item.icon}
                      </MenuItemIcon>
                    </ItemLink>
                  </Hammer>
                }


              </MenuItem>
            )}
        </Sidemenu>
    )
}

