import React, { useState } from 'react'
import styled from 'styled-components';
import WImage from './WImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


interface LayoutStyleProps
{
  breakpoint:number,
  menuStatus?:boolean
}

const BodyContainer = styled.div`
float:right;
width:calc(100% - 350px);
//transition:all 0.2s;
`;

const Body = styled.div`
border-radius: 4px;
background:white;
width: 90%;
max-width:1200px;
margin: auto;
margin-top:90px;
margin-bottom:30px;
padding-top:40px;
padding-bottom:40px;


`;

const SidebarContainer = styled.aside`
height: 100%;
position:fixed;
overflow: hidden;
width:350px;
box-shadow: 4px 7px 10px rgba(0, 0, 0, 0.4);
//transition:all 0.2s;
z-index: 1000;
background:${props => props.theme.primaryBackground};
color: ${props => props.theme.primaryForeground};
`;

const Sidebar = styled.div`
height:calc(100% - 40px);
width:100%;
overflow:auto;
//transition:all 0.2s;

`;

const Topbar = styled.div`

//transition:all 0.2s;
background: ${props => props.theme.primaryDark1Background};
height:60px;
display:flex;
align-items:center;
color: ${props => props.theme.primaryDark1Foreground};
position: fixed;
right:0;
top: 0;
z-index: 1000;
padding-left: 30px;
padding-right: 30px;
width: 100%;
width:calc(100% - 350px);
justify-content:space-between;

`;


const Title = styled.h1`
margin: 0;
padding: 0;
font-size: 25px;
font-weight: 600;
display:flex;
align-items:center;

`;


const Layout = styled.div<LayoutStyleProps>`
background-color:#f0f2f5;
${props => props.menuStatus ? 
  `
  ${SidebarContainer}
  {
      transform: translateX(-100%);
  }
  ${BodyContainer},${Topbar}
  {
      width: 100%;
  }
  ` 
  : ''}

@media all and (max-width:${props => props.breakpoint}px)
{
    ${Title} > span
    {
      display:none;
    }
    background-color:white;
    ${BodyContainer},${Topbar}{
      width:100%;
    }
    ${SidebarContainer}
    {
      transform:translateX(-100%);
      width:280px;
    }
    ${Body}
    {
       margin-top:60px;
    }
    ${props => props.menuStatus ? 
    `
    ${SidebarContainer}
    {
        transform: translateX(0%);
    }
    ${Topbar}
    {
      transform: translateX(280px);
    }
   ${BodyContainer}
    {
        transform: translateX(280px);
    }
    `:''}
    
}



height:100%;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
overflow: auto;
overflow-x: hidden;
`;



const MenuOpener = styled.div`
display: flex;
align-items: center;
height: 100%;
position: relative;
left: -30px;
padding-left: 30px;
padding-right: 30px;
cursor:pointer;
&:hover{
opacity:0.5;
}
transition:all 0.2s;
`

const SoftwareVersionBadge = styled.div`

  bottom: 0;
  font-weight: 300;
  color: white;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const ChildrenContainer = styled.div`
width:95%;
margin:auto;
max-width:900px;
`
;
interface WLayoutProps
{
    children:React.ReactNode,
    leftSidebar?:React.ReactNode,
    //rightSidebar?:React.ReactNode,
    breakpoint?:number,
    logo?:string,
    title?:string,
    softwareVersion?:string
}

export default function WLayout(props:WLayoutProps) {
    const [menuStatus, setmenuStatus] = useState(false);

    function getBreakpoint() {
      return props.breakpoint || 1000
    }

    return (
        <Layout menuStatus={menuStatus} breakpoint={getBreakpoint()}>


            {props.leftSidebar &&
            <SidebarContainer  >
                <Sidebar>{props.leftSidebar}</Sidebar>
                {props.softwareVersion && <SoftwareVersionBadge>{props.softwareVersion}</SoftwareVersionBadge>}
            </SidebarContainer>}
            <Topbar >
              {props.leftSidebar && <MenuOpener onMouseDown={()=>{setmenuStatus(!menuStatus)}} ><FontAwesomeIcon icon={faBars} /></MenuOpener>}
              {props.title &&
              <Title>
                <span>{props.title}</span>
                {props.logo && <React.Fragment>&nbsp;&nbsp;<WImage height={'30px'} width={'auto'} src={props.logo} /></React.Fragment>}
              </Title>}
            </Topbar>
            <BodyContainer >
                <Body >
                    <ChildrenContainer>
                      {props.children}
                    </ChildrenContainer>
                </Body>
            </BodyContainer>
            {/*props.rightSidebar &&
            <SidebarContainer  breakpoint={getBreakpoint()}>
                <Sidebar>{props.rightSidebar}</Sidebar>
            </SidebarContainer>*/}
        </Layout>
    )
}

