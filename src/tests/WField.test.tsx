import WField from '../components/WField';
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect'


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
  
describe('WField', () => {

  it('Should render "Name" label', () => {
    render(<WField labelId="label" label="Name" />, container);
    screen.getByText('Name');
  });

  it('Should render children span', () => {
    render(<WField  labelId="label"  label="Name" ><span>Name input</span></WField>, container);
    screen.getByText('Name');
    screen.getByText("Name input");
  });


});

