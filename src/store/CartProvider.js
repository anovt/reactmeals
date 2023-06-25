import CartContext from "./cart-context";
import { useReducer } from "react";

const defultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if(action.type==='ADD_ITEM')
  {
    //console.log(state.items,"state.items");
    const updatedItems = state.items.concat(action.item);
    const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
      items:updatedItems,
      totalAmount:newTotalAmount
    }
  }
  if(action.type==='REMOVE_ITEM')
  {

  }


  return defultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type:'ADD_ITEM',item:item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type:'REMOVE_ITEM',id:id});
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
