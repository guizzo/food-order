import classes from './HeaderCardButton.module.css';
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {

  const [ btnIsAnimated, setBtnIsAnimated ] = useState(false);

  const cartCtx = useContext(CartContext);

  const btnClasses = `${ classes.button } ${ btnIsAnimated ? classes.bump : '' }`;

  useEffect(() => {
    if (!cartCtx.items.length) {
      return;
    }
    setBtnIsAnimated(true);
    const timer = setTimeout(() => {
      setBtnIsAnimated(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [ cartCtx.items ]);

  const numberOfCartItems = cartCtx.items.reduce((accumulator, item) => accumulator + item.amount, 0);

  return (
    <button className={ btnClasses } onClick={ props.onClick }>
      <span className={ classes.icon }>
        <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={ classes.badge }>{ numberOfCartItems }</span>
    </button>
  );

};

export default HeaderCartButton;
