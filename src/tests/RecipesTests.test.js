import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testando componente Header', () => {
  it('Se Header é renderizado na pagina meals', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    expect(history.location.pathname).toBe('/meals');
    const resultText = await screen.findByText(/Beef/i);
    expect(resultText).toBeInTheDocument();
  });

  it('Se Header é renderizado drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    expect(history.location.pathname).toBe('/drinks');
    const resultText = await screen.findByText(/Shake/i);
    expect(resultText).toBeInTheDocument();
  });
});
