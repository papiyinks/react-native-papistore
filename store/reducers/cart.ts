import {
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  SUB_QUANTITY,
} from '../actions/cart';
import { ADD_ORDER } from '../actions/order';

const initialState: { addedItems: any; total: number } = {
  addedItems: [],
  total: 0,
};

export default (
  state = initialState,
  action: {
    type: string;
    data: { _id: string; quantity: number; price: number };
    id: string;
  }
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existed_item = state.addedItems.find(
        (item: { _id: string }) => action.data._id === item._id
      );
      if (existed_item) {
        action.data.quantity += 1;
        return {
          ...state,
          total: state.total + action.data.price,
        };
      } else {
        action.data.quantity = 1;
        //calculating the total
        const newTotal = state.total + action.data.price;

        return {
          ...state,
          addedItems: [...state.addedItems, action.data],
          total: newTotal,
        };
      }
    case ADD_QUANTITY:
      const addedItem = state.addedItems.find(
        (item: { _id: string }) => item._id === action.id
      );

      addedItem.quantity += 1;
      const newSum = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems],
        total: newSum,
      };
    case REMOVE_ITEM:
      const itemToRemove = state.addedItems.find(
        (item: { _id: string }) => action.id === item._id
      );
      const new_items = state.addedItems.filter(
        (item: { _id: string }) => action.id !== item._id
      );

      //calculating the total
      const newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    case SUB_QUANTITY:
      let addedProduct = state.addedItems.find(
        (item: { _id: string }) => item._id === action.id
      );
      //if the qt == 0 then it should be removed
      if (addedProduct.quantity === 1) {
        let new_items = state.addedItems.filter(
          (item: { id: string }) => item.id !== action.id
        );
        let newTotal = state.total - addedProduct.price;
        return {
          ...state,
          addedItems: new_items,
          total: newTotal,
        };
      } else {
        addedProduct.quantity -= 1;
        let newTotal = state.total - addedProduct.price;
        return {
          ...state,
          addedItems: [...state.addedItems],
          total: newTotal,
        };
      }
    case ADD_ORDER:
      return initialState;
  }
  return state;
};
