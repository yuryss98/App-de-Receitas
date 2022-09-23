import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testes da pagina de login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('verificando se os inputs e o botão funcionan corretamente', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(button.disabled).toBe(true);

    const correctEmail = 'teste@teste.com';
    const incorrectEmail = 'xablau';

    userEvent.type(emailInput, incorrectEmail);
    userEvent.type(passwordInput, '1234567');

    expect(button.disabled).toBe(true);

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, '1234567');

    expect(button.disabled).toBe(false);
  });
});
