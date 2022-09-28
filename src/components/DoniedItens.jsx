import { getDoneRecipes } from '../services/gets';
import DoniedItem from './DoniedItem';

function DoniedItens() {
  const items = getDoneRecipes();
  console.log(items);
  return (
    <>
      {items.map((item, index) => (
        <DoniedItem key={ item.name } item={ item } index={ index } />
      ))}
    </>
  );
}

export default DoniedItens;
