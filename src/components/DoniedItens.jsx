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
          <p data-testid={ `${index}-horizontal-top-text` }>
            {item.category + ((item.type === 'drink')
              ? item.alcoholicOrNot
              : (`${item.nationality} - ${item.category}`))}

          </p>
          <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          <p atributo data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>

          <button
            type="button"
          >
            <img
              src="src/images/shareIcon.svg"
              alt="share imag"
              data-testid={ `${index}-horizontal-share-btn` }
            />
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
