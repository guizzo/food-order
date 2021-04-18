import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {

  const cartCtx = useContext(CartContext);

  const removeItemHandler = (id) => cartCtx.removeItem(id);
  const addItemHandler = (item) => cartCtx.addItem(item);

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={ item.id }
      name={ item.name }
      amount={ item.amount }
      price={ item.price }
      onRemove={ removeItemHandler.bind(null, item.id) }
      onAdd={ addItemHandler.bind(null, { ...item, amount: 1 }) }/>
  ));
  const hasItems = cartCtx.items.length > 0;

  return (
    <Modal onHideCart={ props.onHideCart }>
      <ul className={ classes['cart-items'] }>{ cartItems }</ul>
      <div className={ classes.total }>
        <span>Total Amount</span>
        <span>{ cartCtx.totalAmount.toFixed(2) } $</span>
      </div>
      <div className={ classes.actions }>
        <button className={ classes['button--alt'] } onClick={ props.onHideCart }>Close</button>
        { hasItems && <button className={ classes.button }>Order</button> }
      </div>
    </Modal>
  );

};

export default Cart;
