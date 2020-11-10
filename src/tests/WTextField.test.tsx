import WTextField from '../components/WTextField';
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/react';


let container:(HTMLDivElement);
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
    // limpieza al salir
    unmountComponentAtNode(container);
    container.remove();
});

describe('WTextField', () => {

    it('Should render "Name" label', () => {
      act(() => {
          render(<WTextField label="Name" />, container);
      });
      screen.getByLabelText('Name');
    });
  
    it('Should fire onChange event on typing', () => {
        const inputText = 'John Doe';
        let inputValue = null;
        const onChange = jest.fn((value:string | number | null)=>{
            inputValue = value;
        });
        
        render(<WTextField onChange={onChange} label="Name" />, container);

        userEvent.type(screen.getByLabelText('Name'),inputText);
        expect(onChange).toHaveBeenCalledTimes(inputText.length);
        expect(inputValue).toBe(inputText);
    });

    it('Should render validation errors (string)',async () => {
        let inputValue = null;
        const onChange = jest.fn((value:string | number | null)=>{
            inputValue = value;
        });
                
        render(<WTextField rules={{min:5,max:100}} onChange={onChange} label="Name" />, container);
        
        userEvent.type(screen.getByRole('textbox'),'Mike');
        screen.getByText('Ingrese mínimo 5 caracteres');

        userEvent.type(screen.getByRole('textbox'),"Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike Mike");
        screen.getByText('Ingrese máximo 100 caracteres');

        fireEvent.change(screen.getByRole('textbox'), { target: { value: "" } });
        screen.getByText('Campo requerido');

    });

    it('Should not render validation errors (string)',async () => {
      let inputValue = null;
      const onChange = jest.fn((value:string | number | null)=>{
          inputValue = value;
      });
              
      render(<WTextField rules={{min:5,max:100}} onChange={onChange} label="Name" />, container);
      
      userEvent.type(screen.getByRole('textbox'),"Mike Johnson");

      expect(screen.queryByTestId('validation-errors')).not.toBeInTheDocument();
      expect(inputValue).toBe("Mike Johnson");
    });

    
    it('Should render validation errors (number)',async () => {
      let inputValue = null;
      const onChange = jest.fn((value:string | number | null)=>{
          inputValue = value;
      });
              
      render(<WTextField rules={{min:5,max:100}} validationType="number" onChange={onChange} label="Max speed" />, container);
      
      userEvent.type(screen.getByRole('textbox'),'Mike');
      screen.getByText('Ingrese un número');

            
      userEvent.type(screen.getByRole('textbox'),'4');
      screen.getByText('Ingrese un valor mayor o igual a 5');

                  
      userEvent.type(screen.getByRole('textbox'),'110');
      screen.getByText('Ingrese un valor menor o igual a 100');


  });

  it('Should not render validation errors (number)',async () => {
    
    let inputValue = null;
    const onChange = jest.fn((value:string | number | null)=>{
        inputValue = value;
    });
            
    render(<WTextField rules={{min:5,max:100}} onChange={onChange} validationType="number" label="Name" />, container);
    
    userEvent.type(screen.getByRole('textbox'),"25");

    expect(screen.queryByTestId('validation-errors')).not.toBeInTheDocument();
    expect(inputValue).toBe("25");
  });


     
    it('Should render validation errors (number)',async () => {
      let inputValue = null;
      const onChange = jest.fn((value:string | number | null)=>{
          inputValue = value;
      });
              
      render(<WTextField rules={{min:5,max:100}} validationType="number" onChange={onChange} label="Max speed" />, container);
      
      userEvent.type(screen.getByRole('textbox'),'Mike');
      screen.getByText('Ingrese un número');

            
      userEvent.type(screen.getByRole('textbox'),'4');
      screen.getByText('Ingrese un valor mayor o igual a 5');

                  
      userEvent.type(screen.getByRole('textbox'),'110');
      screen.getByText('Ingrese un valor menor o igual a 100');


  });

     
  it('Should render validation errors (input type number)',async () => {
    let inputValue = null;
    const onChange = jest.fn((value:string | number | null)=>{
        inputValue = value;
    });
            
    render(<WTextField rules={{min:5,max:100}} type={"number"} onChange={onChange} label="Max speed" />, container);
    
    userEvent.type(screen.getByRole('textbox'),'Mike');
    screen.getByText('Ingrese un número');

          
    userEvent.type(screen.getByRole('textbox'),'4');
    screen.getByText('Ingrese un valor mayor o igual a 5');

                
    userEvent.type(screen.getByRole('textbox'),'110');
    screen.getByText('Ingrese un valor menor o igual a 100');


});




  
  
  });
  