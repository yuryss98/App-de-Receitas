import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const FAVORITE_URL = '/favorite-recipes';
const STORAGE_MOCK = '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"},{"id":"53060","type":"food","nationality":"Croatian","category":"Side","alcoholicOrNot":"","name":"Burek","image":"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"}]';

describe('Testando Receitas Favoritas', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Se as receitas sao carregadas de forma certa do MOCK && Testa redirecionamento para tela de detalhes', async () => {
    localStorage.setItem('favoriteRecipes', STORAGE_MOCK);
    const { history } = renderWithRouter(<App />, FAVORITE_URL);
    const resultText = await screen.findByText(/GG/i);
    expect(resultText).toBeInTheDocument();
    userEvent.click(resultText);
    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('Se os botôes de filtro funciona', async () => {
    localStorage.setItem('favoriteRecipes', STORAGE_MOCK);

    renderWithRouter(<App />, FAVORITE_URL);
    const resultAll = await screen.findByText(/All/i);
    const resultDrinks = await screen.findByText(/Drinks/i);
    userEvent.click(resultAll);
    userEvent.click(resultDrinks);
  });

  it('Se botao de remover favorito funciona', async () => {
    localStorage.setItem('favoriteRecipes', STORAGE_MOCK);

    renderWithRouter(<App />, FAVORITE_URL);
    const resultID = screen.getByTestId('0-horizontal-favorite-btn');
    const resultGG = await screen.findByText(/GG/i);
    userEvent.click(resultID);
    expect(resultGG).not.toBeInTheDocument();
  });
});

// FavoriteCard 100% abaixo, porem pesquisando como mockar o clipboard;

// it('Se botao de copiar esta funcionando', async () => {
//   localStorage.setItem('favoriteRecipes', STORAGE_MOCK);

//   renderWithRouter(<App />, FAVORITE_URL);
//   const resultID = screen.getByTestId('0-horizontal-share-btn');
//   expect(resultID).toBeInTheDocument();
//   userEvent.click(resultID);
//   const resultCopy = await screen.findByText(/Link copied!/i);
//   expect(resultCopy).toBeInTheDocument();
// });
