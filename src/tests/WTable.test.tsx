import WTable from '../components/WTable';
import WTableCol from '../components/WTableCol';
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { screen ,within,getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect'
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


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
  
describe('WTable', () => {

  it('Should render items and title', async () => {
    let items = [
        {id:'13132',name:'John',surname:'Doe',mark:6.5},
        {id:'31212',name:'Jane',surname:'Doe',mark:8.5},
        {id:'54576',name:'Foo',surname:'Bar',mark:5.5},
    ];

    act(()=>{
        render(
            <WTable title="Students" items={items}>
                <WTableCol header="ID" prop="id" width="25%" />
                <WTableCol header="Name" prop="name" width="25%" />
                <WTableCol header="Surname" prop="surname" width="25%" />
                <WTableCol header="Mark" prop="mark" width="25%" />
            </WTable>
        , container);
    });

    screen.getByRole("heading",{name:"Students"});

    items.forEach(({id,name,surname,mark}) => {
        const row = screen.getByText(id).closest("tr");
        const utils = within(row);

        utils.getByText(id);
        utils.getByText(name);
        utils.getByText(surname);
        utils.getByText(mark.toString());
    });

  });

  it('Should sort items', async () => {
    let items = [
        {id:'13132',name:'John',surname:'Doe',mark:6.5},
        {id:'31212',name:'Jane',surname:'Doe',mark:8.5},
        {id:'54576',name:'Foo',surname:'Bar',mark:5.5},
    ];

    act(()=>{
        render(
            <WTable title="Students" items={items}>
                <WTableCol header="ID" prop="id" width="25%" />
                <WTableCol header="Name" prop="name" width="25%" />
                <WTableCol header="Surname" prop="surname" width="25%" />
                <WTableCol header="Mark" sortable prop="mark" width="25%" />
            </WTable>
        , container);
    });

    let rows = screen.getAllByRole("row");

    let row =  within(rows[1]);
    row.getByText("13132");
    row.getByText("John");
    row.getByText("Doe");
    row.getByText("6.5");

    row = within(rows[2]);
    row.getByText("31212");
    row.getByText("Jane");
    row.getByText("Doe");
    row.getByText("8.5");

    row = within(rows[3]);
    row.getByText("54576");
    row.getByText("Foo");
    row.getByText("Bar");
    row.getByText("5.5");

    userEvent.click(screen.getByRole('columnheader',{name:'Mark'}));

    rows = screen.getAllByRole("row");

    row = within(rows[1]);
    row.getByText("31212");
    row.getByText("Jane");
    row.getByText("Doe");
    row.getByText("8.5");

    row =  within(rows[2]);
    row.getByText("13132");
    row.getByText("John");
    row.getByText("Doe");
    row.getByText("6.5");

    row = within(rows[3]);
    row.getByText("54576");
    row.getByText("Foo");
    row.getByText("Bar");
    row.getByText("5.5");


  });

});

