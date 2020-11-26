import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortAmountDown,faInbox,faExclamationTriangle, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import WPagination from './WPagination';
//import WCheckRadio from './WCheckRadio';
//import WTableCol from './WTableCol';

import _ from 'lodash';

export interface DataRowStyleProps
{
    rowIndex?:number
}
export interface TableContainerStyleProps
{
    maxHeight?:string,
    breakpoint?:string,
    loading?:boolean
}
export interface TableStyleProps
{
}

export const Header =styled.th`
text-align:left;
padding-top: 16px;
padding-bottom: 16px;
vertical-align:middle;
&:last-child
{
    padding-right:40px;
}

&:first-child
{
    padding-left: 40px;
}
`;
//max-height:${(props)=>props.maxHeight || 'inherit'};
export const TableContainer = styled.div<TableContainerStyleProps>`

position:relative;
overflow:${(props) => props.loading ? 'hidden' : 'inherit'};


${props => props.breakpoint && `
@media all and (max-width:${props.breakpoint})
{
    ${TableTitle}
    {
        padding-left:20px;
        padding-right:20px;
        text-align:center;
    }
    ${HeadTable}
    {
        display:none;
        
    }
    ${DataTable}
    {
        display:block;
        ${Body},${DataRow},${Data} {
            display:block;
            width:100%!important;
        }
        ${DataRow}
        {
            display:grid;
        }
        ${DataRow} &
        {
            background-color:green;
        }
        ${HeadTable}
        {
            display:none;
        }
  
    }
`}

`;
export const Table = styled.table<TableStyleProps>`
width:100%;
border-spacing:0px;
`;

export const DataTable = styled(Table)``;

export const HeadTable = styled(Table)`
position:sticky;
top:0;
`;

export const Head = styled.thead`
background:${props => props.theme.primaryBackground};
color: ${props => props.theme.primaryForeground};
box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
font-weight:bold;

`;
export const Body = styled.tbody`

`;

export const Row =styled.tr`

`;


export const DataRow= styled(Row)<DataRowStyleProps>`

&:nth-child(even)
{
    background:#eeeeee;
}

`;

export const Data =styled.td`

`;

export const TableTitle = styled.div`


border-top-left-radius:10px;
border-top-right-radius:10px;
font-size: 20px;
padding: 20px;
padding-left: 40px;
padding-right: 40px;
padding-top: 20px;
background: #212121;
color: white;
`;
export const HeaderContainer = styled.div`
position:sticky;
top:60px;`;

export const EmptyTableMessage = styled.td`
padding: 20px;
text-align: center;
font-weight: bold;
height: 120px;
color:#9e9e9e;
& > div
{
    margin-top:8px;
}
`;

export const Loading = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
align-items: center;
justify-content: center;
background: rgba(0,0,0,0.65);
`;

export const Footer = styled.footer`
position:sticky;
bottom:0;
`;

export const MainContainer = styled.div`
position:relative;
box-shadow: 0 0px 25px 0px rgba(0,0,0,0.25);
`;



interface BasePaginationConfig {
    padding?:number,
    page?:number
}

interface LocalPaginationConfig extends BasePaginationConfig{
    pageSize?:number,
    type:'local'
}

interface ServerPaginationConfig extends BasePaginationConfig {
    totalPages:number,
    pageSize:number,
    onPage:(page:number) => any,
    type:'server'
}

type PaginationConfig  = (ServerPaginationConfig | LocalPaginationConfig);


interface Header
{
    label: (string | ReactNode),
    prop: string,
    width:string,
    sortable?:boolean,
}

interface TableProps
{
  selectionMode?:('single'|'multiple'),
  children:React.ReactNode,
  items:any[],
  //maxHeight?:string,
  breakpoint?:string,
  title?:string,
  sort?:string,
  onSort?:(sort:string)=>any,
  emptyTableMessage?:string,
  loading?:boolean,
  footer?:React.ReactNode,
  paginationConfig?: PaginationConfig,
  error?:string
}

export const TableRowContext = createContext< {item:any} | undefined >(undefined);//createContext<Partial<SelectFieldOptionProps>>({});
export const TableContext = createContext< {renderSortIcon:(header:Header) => any,sortOrder:string|undefined,breakpoint?:string,setHeader:(data:Header)=>void} | undefined >(undefined);//createContext<Partial<SelectFieldOptionProps>>({});

export default function WTable(props:TableProps) {
    const [headers,setHeaders] = useState<{[prop:string]:Header}>({});
    const headersRef = useRef<{[prop:string]:Header}>({});
    const [data,setData] = useState<any[]>([]);
    const [sortOrder, setSortOrder] = useState<string | undefined>(props.sort);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(()=>{
        setData(props.items);
    },[props.items]);

    useEffect(()=>{
        if(props.paginationConfig?.page)
        {
            setCurrentPage(props.paginationConfig?.page);
        }
    },[props.paginationConfig?.page])

    function getPaginationConfig()
    {
        let defaultPageSize = 10;

        return {
            totalPages:(props.paginationConfig as ServerPaginationConfig).totalPages || Math.ceil(props.items.length / (props.paginationConfig?.pageSize || defaultPageSize)),
            page:currentPage,
            onPage:(props.paginationConfig as ServerPaginationConfig).onPage || onPage,
            pageSize:props.paginationConfig?.pageSize || defaultPageSize
        }


    }
    function getData()
    {

        if(props.paginationConfig && props.paginationConfig.type == 'local')
        {
            return data.slice((getPaginationConfig().page - 1) * getPaginationConfig().pageSize, getPaginationConfig().pageSize * getPaginationConfig().page)
        }
        else{
            return data;
        }
    }

    function onPage(page:number)
    {
        setCurrentPage(page);
    }

    function setHeader(data:Header)
    {
        headersRef.current[data.prop] = {label:data.label,width:data.width,sortable:data.sortable,prop:data.prop};
        setHeaders(headersRef.current)
    }

    function onSort(index:number)
    {
        let prop = Object.keys(headers)[index];
        let header = Object.values(headers)[index];

        if(!header.sortable)
        {
            return;
        }

        let sort = sortOrder;
        let order:(1 | -1);

        if(!sort || _.trimStart(sort,'-') != prop || sort != `-${prop}`)
        {
            sort = `-${prop}`;
            order = -1;
        }
        else
        {
            sort = `${prop}`;
            order = 1;
        }

        setSortOrder(sort);

        //Custom sort (for example, to manage sorting in server)
        if(props.onSort)
        {
            props.onSort(sort);
            return;
        }

        // Local sort
        setData([...data.sort((a,b)=>{
            if (a[prop] > b[prop]) {
                return order;
              }
              if (a[prop] < b[prop]) {
                return order == -1 ? 1: -1;
              }
              return 0;
        })]);
    }
    function renderSortIcon(header:Header)
    {
        if(!header.sortable)
        {
            return;
        }
        //let prop = Object.keys(headers)[index];
        let index = Object.values(headers).findIndex(h => h.prop == header.prop);
        let prop = header.prop;

        if(sortOrder === `-${prop}`)
        {
            return <FontAwesomeIcon style={{cursor:'pointer'}} onClick={()=>{onSort(index);}}
                    icon={faSortAmountDown} />
        }
        else if(sortOrder === `${prop}`)
        {
            return <FontAwesomeIcon style={{cursor:'pointer'}} onClick={()=>{onSort(index);}}
                    icon={faSortAmountUp} />
        }
        else
        {
            return <FontAwesomeIcon style={{cursor:'pointer'}} onClick={()=>{onSort(index);}}
            icon={faSort} />
        }
    }

    return (
    <MainContainer>
      <TableContainer breakpoint={props.breakpoint}>
        <TableContext.Provider value={{sortOrder,breakpoint:props.breakpoint, setHeader,renderSortIcon}}>
          <HeaderContainer>
            {props.title && <TableTitle  role="heading" aria-level={3} >{props.title}</TableTitle>}
            <HeadTable>
              <Head>
                <Row>
                  {Object.values(headers).map((header, index) =>
                    <Header onClick={()=>{onSort(index);}} style={{width:header.width}} key={index}>
                      <span style={{marginRight:'10px'}}>{header.label}</span>
                      {renderSortIcon(header)}
                    </Header>
                  )}
                </Row>
              </Head>
            </HeadTable>
          </HeaderContainer>
          <DataTable >

            {props.error ?
              <Body >
                <DataRow>
                  <EmptyTableMessage>
                    <FontAwesomeIcon size="lg" icon={faExclamationTriangle} />
                    <div>{props.error}</div>
                  </EmptyTableMessage>
                </DataRow>
              </Body>
              :
              <Body >

                {getData().length > 0 ?
                  getData().map((item,index)=>(
                    <DataRow key={item._id || item.id || index}>


                      {/*typeof props.selectionMode !== 'undefined' &&
                      <Header style={{width:'12%'}}>
                        {props.selectionMode === 'multiple' && <WCheckRadio type={'checkbox'} /> }
                      </Header>*/
                      }
                      <TableRowContext.Provider value={{item}}>
                        {props.children}
                      </TableRowContext.Provider>
                    </DataRow>
                  )):
                  <DataRow>
                    <EmptyTableMessage>
                      <FontAwesomeIcon size="lg" icon={faInbox} />
                      <div>{props.emptyTableMessage || 'No hay elementos para mostrar'}</div>
                    </EmptyTableMessage>
                  </DataRow>
                }
              </Body>

            }

          </DataTable>

          <Footer>
            {!props.error && props.items.length > 0 && props.paginationConfig && getPaginationConfig().totalPages > 1 &&
            <WPagination
              totalPages={getPaginationConfig().totalPages}
              page={getPaginationConfig().page}
              onClickPage={getPaginationConfig().onPage}
            />
            }

            {props.footer}
          </Footer>
        </TableContext.Provider>
      </TableContainer>

      {props.loading &&
      <Loading>
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"/>
              </path>
            </g>
          </g>
        </svg>
      </Loading>
      }
    </MainContainer>
    )
}

