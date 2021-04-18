import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      let items = [ ...state.items ];
      let totalAmount = state.totalAmount;
      const index = items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        items[index].amount = items[index].amount + action.payload.amount;
      } else {
        items = [ ...items, { ...action.payload } ];
      }
      totalAmount = state.totalAmount + (action.payload.price * action.payload.amount);
      return {
        items,
        totalAmount
      };
    }
    case 'REMOVE_ITEM': {
      const index = state.items.findIndex((item) => item.id === action.payload);
      const existingItem = state.items[index];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems = [ ...state.items ];
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((el) => el.id !== action.payload);
      } else {
        updatedItems[index] = { ...existingItem, amount: existingItem.amount - 1 };
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
    }
    default: {
      return defaultCartState;
    }
  }
};

const CartProvider = (props) => {

  const [ cartState, dispatchCartAction ] = useReducer(cartReducer, defaultCartState);

  const addItem = (item) => dispatchCartAction({ type: 'ADD_ITEM', payload: { ...item } });
  const removeItem = (id) => dispatchCartAction({ type: 'REMOVE_ITEM', payload: id });

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem
  };

  return (
    <CartContext.Provider value={ cartContext }>
      { props.children }
    </CartContext.Provider>
  );

};

export default CartProvider;
