import React from 'react';
import MealItemForm from './MealItemForm';
import styles from './MealItem.module.css';

const MealItem = ({ name, description, price, id }) => {
  const changePrice = `$${price.toFixed(2)}`;
  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{changePrice}</div>
      </div>
      <div>
        <MealItemForm id={id} />
      </div>
    </li>
  );
};

export default MealItem;
