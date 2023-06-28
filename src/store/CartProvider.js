import CartContext from "./cart-context";
import { useReducer } from "react";

const defultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    //console.log(state.items,"state.items");

    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartFindIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItems = state.items[existingCartFindIndex];

    let updatedItems;
    if (existingCartItems) {
      const updatedItem = {
        ...existingCartItems,
        amount: existingCartItems.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartFindIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartFindIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingtItem = state.items[existingCartFindIndex];
    const updatedTotalAmount = state.totalAmount - existingtItem.price;
    let updatedItems;
    if (existingtItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingtItem,
        amount: existingtItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartFindIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
