import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testando componente Footer', () => {
  it('verificar se o Footer está presente onde deveria', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const footer = screen.getByTestId('footer');
    const [drinkBtn, mealsBtn] = [screen.getByTestId('drinks-bottom-btn'), screen.getByTestId('meals-bottom-btn')];
    expect(footer).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  it('Se os botões do footer funcionam', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    await waitFor(() => expect(history.location.pathname).toBe('/drinks'));
    userEvent.click(screen.getByTestId('meals-bottom-btn'));
    await waitFor(() => expect(history.location.pathname).toBe('/meals'));
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    await waitFor(() => expect(history.location.pathname).toBe('/drinks'));
  });
});
