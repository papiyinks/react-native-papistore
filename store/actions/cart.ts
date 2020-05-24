export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const SUB_QUANTITY = 'SUB_QUANTITY';

export const addToCart = (data: object) => {
  return {
    type: ADD_TO_CART,
    data,
  };
};

export const removeItem = (id: string) => {
  return {
    type: REMOVE_ITEM,
    id,
  };
};

export const addQuantity = (id: string) => {
  return {
    type: ADD_QUANTITY,
    id,
  };
};

export const subtractQuantity = (id: string) => {
  return {
    type: SUB_QUANTITY,
    id,
  };
};
