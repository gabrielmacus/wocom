import React, { useState } from 'react'
import styled from 'styled-components';
import WList,{ListItem} from './WList';
import WMenu from './WMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'


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
    <Actions onClick={()=>setMenuOpened(!menuOpened)} >
      <FontAwesomeIcon   style={{textAlign:'right'}} icon={faEllipsisV} />
      <WMenu onClose={()=>setMenuOpened(false)} position={"right-bottom"} opened={menuOpened}>
        <WList
          listItems={props.actions}
        />
      </WMenu>
    </Actions>
  )
}

