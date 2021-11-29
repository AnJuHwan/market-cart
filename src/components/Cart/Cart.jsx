import React, { useContext } from 'react';
import { useState } from 'react/cjs/react.development';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({ onClose }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem(item);
  };

  const orederHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    fetch(
      'https://react-http-test-8f6fa-default-rtdb.firebaseio.com/order.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartContext.items,
        }),
      },
    );
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orederHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={onClose} />
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
