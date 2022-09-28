import { getDoneRecipes } from '../services/gets';

function DoniedItens() {
  const items = getDoneRecipes();
  console.log(items);
  return (
    <>
      {items.map((item, index) => (
        <div key={ item.name }>
          <img
            alt={ `${item.name} img` }
            src={ item.image }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>{item.category}</p>
          <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          <p atributo data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            compartilhar
          </button>
          {item.tags.map((tag) => (
            <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
          ))}
        </div>
      ))}
    </>
  );
}

export default DoniedItens;
