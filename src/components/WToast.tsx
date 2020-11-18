import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components';

interface ToastStyleProps {
  mode?:('success'|'warning'|'error'|'info'|'default')
}

const Toast = styled.div<ToastStyleProps>`
    cursor:pointer;
    width: 250px;
    color: white;
    padding: 10px;
    border-radius: 7px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    
    ${props => {
      
      switch (props.mode) {
        case 'success':
          return `background-color:#43a047`;
          break;
        case 'warning':
          return `background-color:#ffeb3b;color:black;`;
          break;
        case 'error':
          return `background-color:#e53935`;
          break;
        case 'info':
          return `background-color:#1e88e5`;
          break;
        default:
          return 'background: #212121;';
          break;
      }
      
    }}
    
    
`;

const ToastText = styled.div`
font-weight: 600;
`;

const ToastDescription = styled.div`
line-height:1.3;
margin-top:10px;
`;


interface WToastProps
{
  mode?:('success'|'warning'|'error'|'info'|'default'),
  title:string,
  description?:string,
  timeout?:number,
}


function WToast(props:WToastProps) {
  const [showToast,setShowToast] = useState(true);

  return (
    <React.Fragment>
      {showToast && <Toast onClick={()=>setShowToast(false)} mode={props.mode}>
        <ToastText>{props.title}</ToastText>
        {props.description && <ToastDescription>{props.description}</ToastDescription>}
      </Toast>}
    </React.Fragment>
  )
}

export default function renderToast(props:WToastProps) {

  let toastListElement = document.getElementById("w-toast-list");
  if(!toastListElement)
  {
    toastListElement = document.createElement("div");
    toastListElement.id = 'w-toast-list';
    toastListElement.style.position = 'fixed';
    toastListElement.style.right = '30px';
    toastListElement.style.bottom = '30px';
    toastListElement.style.display = 'grid';
    toastListElement.style.gridGap = '10px';

    document.getElementById("root")?.appendChild(toastListElement);
  }
  let toastContainer = document.createElement("div");
  toastContainer.style.display = 'contents';
  toastListElement.appendChild(toastContainer);
  ReactDOM.render(<WToast description={props.description} mode={props.mode} title={props.title} timeout={props.timeout} /> , toastContainer);

  setTimeout(()=>{
    toastContainer.remove();
  },props.timeout || 3000);

}

