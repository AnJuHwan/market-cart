import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import styles from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

const MealItem = ({ name, description, price, id }) => {
  const cartContext = useContext(CartContext);

  const changePrice = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{changePrice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
