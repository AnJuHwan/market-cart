import React, { useRef, useState } from 'react';
import styles from './Checkout.module.css';

const isEmpty = (value) => value.trim().length === 0;
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = ({ onCancel, onConfirm }) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPoastalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPoastalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPoastalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });

    console.log(enteredName, enteredStreet, enteredPostalCode, enteredCity);
  };

  const nameControlClassName = `${styles.control} ${
    formInputsValidity.name ? '' : styles.invalid
  }`;
  const streetControlClassName = `${styles.control} ${
    formInputsValidity.street ? '' : styles.invalid
  }`;
  const postalCodeControlClassName = `${styles.control} ${
    formInputsValidity.postalCode ? '' : styles.invalid
  }`;
  const cityControlClassName = `${styles.control} ${
    formInputsValidity.city ? '' : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlClassName}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClassName}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClassName}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postalCode (5character)!</p>
        )}
      </div>
      <div className={cityControlClassName}>
        <label htmlFor='city'>City Code</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
