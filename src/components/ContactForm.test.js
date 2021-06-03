import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName,'asd');

    const errMsg = await screen.findAllByTestId('error')
    expect(errMsg).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submit = screen.getByRole('button');
    userEvent.click(submit);
    
    const errMsg = await screen.findAllByTestId('error');
    expect(errMsg).toHaveLength(3);


});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'Daniel')
    const LastName = screen.getByLabelText(/last name/i);
    userEvent.type(LastName, 'Hefner')
    const email = screen.getByLabelText(/email/i);
    userEvent.type(email, '');
    const submit = screen.getByRole('button');
    userEvent.click(submit);
    const errMsg = await screen.findAllByTestId('error');
    expect(errMsg).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByLabelText(/email/i);
    userEvent.type(email, 'asd');

    const errMsg = await screen.findByText(/email must be a valid email address/i);
    expect(errMsg).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const submit = screen.getByRole('button');
    userEvent.click(submit);

    const errMsg = await screen.findByText(/lastName is a required field/i);
    expect(errMsg).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, 'Daniel');
    
    const lastName = screen.getByLabelText(/last name*/i);
    userEvent.type(lastName, 'Hefner');
    
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'danielhefner@gmail.com');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(()=>{
        const firstnameDisplay = screen.queryByText('Daniel');
        const lastnameDisplay = screen.queryByText('Hefner');
        const emailDisplay = screen.queryByText('danielhefner@gmail.com');
        const messageDisplay = screen.queryByTestId('messageDisplay');

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, 'Daniel');
    
    const lastName = screen.getByLabelText(/last name*/i);
    userEvent.type(lastName, 'Hefner');
    
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'danielhefner@gmail.com');

    const message = screen.getByLabelText(/message*/i);
    userEvent.type(message, 'text');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(()=>{
        const firstnameDisplay = screen.queryByText('Daniel');
        const lastnameDisplay = screen.queryByText('Hefner');
        const emailDisplay = screen.queryByText('danielhefner@gmail.com');
        const messageDisplay = screen.queryByTestId('messageDisplay');

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    });
});