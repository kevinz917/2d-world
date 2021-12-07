import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../common/types/Item';
import './ItemCard.scss';

interface itemCardOwnProps {
  item: Item;
  key: string;
  onClick: any;
}

const ItemCard = (props: itemCardOwnProps): ReactElement => {
  const { item, key, onClick } = props;

  return (
    <div className="itemCardContainer" key={key} onClick={onClick}>
      <div className="header3">{item.name}</div>
      <div className="body2 subtitle">{item.notes}</div>
    </div>
  );
};

export default ItemCard;
