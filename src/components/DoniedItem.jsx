import PropTypes from 'prop-types';
import { useState } from 'react';

function DoniedItem(props) {
  const { item, index } = props;
  const [linkisCopied, setLinkisCopied] = useState(false);
  return (
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
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000/${item.type}s/${item.id}`);
          setLinkisCopied(true);
        } }
      >
        <img
          src="src/images/shareIcon.svg"
          alt="share imag"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {linkisCopied && <p>Link copied!</p>}
      {item.tags.map((tag) => (
        <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
      ))}
    </div>
  );
}

export default DoniedItem;
