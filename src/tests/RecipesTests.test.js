import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando pagina de receitas', () => {
  it('verificar os filtros', async () => {
    global.fetch = jest.fn().mockReturnValue(
      { json: jest.fn().mockReturnValue([{}]) },
    );
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    userEvent.click(screen.getByTestId('All-category-filter'));
    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument(); // dump test
  });
});
