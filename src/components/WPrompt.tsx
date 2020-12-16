import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components';
import WPopup from './WPopup';
import WButton from './WButton';

interface WPromptProps
{
    onClose:()=>any,
    title?:string,
    description?:string,
    yesButton:{bgColor?:string,fgColor?:string,label?:string, fn:()=>any},
    noButton?:{bgColor?:string,fgColor?:string,label?:string}
}

const Prompt = styled.div`
background: white;
padding: 20px;
box-shadow: 0 0px 25px 0px rgba(0,0,0,0.25);
border-radius: 10px;
width: 90vw;
max-width: 400px;
& > :nth-child(2)
{
  margin-top:10px;
}
`;
const PromptTitle = styled.div`
font-weight: 600;
    font-size: 18px;
`;
const PromptText = styled.div``;

const PromptButtons = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 20px;
margin-top: 20px;
`;

function WToast(props:WPromptProps) {

  return (
    <React.Fragment>
      <Prompt >
        {props.title && <PromptTitle>{props.title}</PromptTitle>} 
        {props.description && <PromptText>{props.description}</PromptText>}
        <PromptButtons>
          <WButton bgColor={props.yesButton.bgColor}  fgColor={props.yesButton.fgColor} onClick={()=>{props.yesButton.fn(); props.onClose();}} size={'small'} label={props.yesButton.label || 'Si'} />
          <WButton  bgColor={props.noButton?.bgColor} fgColor={props.noButton?.fgColor} onClick={()=>props.onClose()} size={'small'} label={props.noButton?.label || 'No'} />
        </PromptButtons>
      </Prompt>
    </React.Fragment>
  )
}

export default function renderPrompt(props:Omit<WPromptProps,'onClose'>) {

  let promptContainer = document.getElementById("w-prompt");
  if(!promptContainer)
  {
    promptContainer = document.createElement("div");
    promptContainer.id = 'w-prompt';
    promptContainer.style.width='100%';
    document.getElementById("root")?.appendChild(promptContainer);
  }

  function close()
  {
    promptContainer?.remove();
  }

    let prompt = document.createElement("div");
    prompt.style.display = 'contents';
    prompt.style.width = '100%';
    promptContainer.appendChild(prompt);
    ReactDOM.render(<WPopup  onClose={()=>close()} opened={true}><WToast onClose={close} yesButton={props.yesButton} noButton={props.noButton} description={props.description} title={props.title} /></WPopup>, prompt);
  
    /*
  let promptElement = document.getElementById("w-prompt");
  if(!toastListElement)
  {
    toastListElement = document.createElement("div");
    toastListElement.id = 'w-prompt';
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
  },props.timeout || 3000);*/

}

