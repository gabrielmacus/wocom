import React, {useEffect, useContext} from 'react';
import styled from 'styled-components';
import {Header,TableRowContext,TableContext} from './WTable';


export interface MobileHeaderStyleProps
{
}
export interface ColStyleProps
{
    width:string,
    breakpoint?:string
}

export const MobileElement = styled.div<MobileHeaderStyleProps>`
display:none;

`;

export const Col =styled(Header).attrs({as:'td'})<ColStyleProps>`
vertical-align: middle;
&:not(:last-child){
    padding-right: 20px;
}
width:${props => props.width};
${props => props.breakpoint && `
@media all and (max-width:${props.breakpoint})
{
    ${MobileElement},&
    {
        display:block;
        width:100%;
    }
    padding:10px 20px 10px 20px!important;
}
`}


`;

export const MobileHeader = styled(MobileElement)`
font-size: 12px;
color: #808080;
line-height: 1.2;
font-weight: bold;
margin-bottom: 5px;
`;

export interface TableColProps
{
 header:React.ReactNode | string,
 prop?:string,
 width:string,
 sortable?:boolean,
 body?:(params?:{value?:any,row?:any}) => React.ReactNode
}

export default function WTableCol(props:TableColProps) {
    const tableContext = useContext(TableContext);
    useEffect(()=>{
        if(props.prop)
        {
          tableContext?.setHeader({label:props.header,width:props.width,sortable:props.sortable,prop:props.prop});
        }
    },[]);

    return (
    <TableRowContext.Consumer>
        {context =>
          <React.Fragment>

            <Col  breakpoint={tableContext?.breakpoint} width={props.width}>
              <MobileHeader>{props.header}&nbsp;&nbsp;{props.prop && tableContext?.renderSortIcon({label:props.header,width:props.width,sortable:props.sortable,prop:props.prop})}</MobileHeader>
              {props.prop ? (props.body?.({value:context?.item[props.prop],row:context?.item}) || context?.item[props.prop]) : props.body?.({value:null,row:context?.item})  }

            </Col>

          </React.Fragment>
        }
    </TableRowContext.Consumer>
    )
}

