import React, { useState } from 'react'
import styled from 'styled-components';
import WList,{ListItem} from './WList';
import WMenu from './WMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import OutsideClickHandler from 'react-outside-click-handler';


interface TableColActionsProps
{
  actions:ListItem[],
  width?:string
}

const Actions = styled.span`
cursor:pointer;
position:relative;
width:100%;
text-align:right;
display:block;
`;

export default function WTableColActions(props:TableColActionsProps) {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);


  return (
    <OutsideClickHandler onOutsideClick={()=>setMenuOpened(false)}>
    <Actions onClick={()=>setMenuOpened(!menuOpened)} >
      <FontAwesomeIcon   style={{textAlign:'right'}} icon={faEllipsisV} />
      <WMenu position={"right-bottom"} opened={menuOpened}>
        <WList
          listItems={props.actions}
        />
      </WMenu>
    </Actions>
    </OutsideClickHandler>
  )
}

