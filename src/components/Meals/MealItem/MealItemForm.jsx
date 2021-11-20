import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = ({ id, onAddToCart }) => {
  const [amountIsValid, setAmoutIsValid] = useState(true);
  const amoutInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amoutInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmount > 5
    ) {
      setAmoutIsValid(false);
      return;
    }
    onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amoutInputRef}
        label='Amount'
        input={{
          id: 'amount' + id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1~5). </p>}
    </form>
  );
};

export default MealItemForm;
