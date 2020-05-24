import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SHOW_PRODUCT,
  SET_PRODUCTS,
} from '../actions/products';

const initialState: { availableProducts: any; showProduct: object } = {
  availableProducts: [],
  showProduct: {},
};

export default (
  state = initialState,
  action: {
    type: string;
    products: object;
    createdProduct: object;
    productData: { data: object };
    updatedProduct: { data: any };
    deletedProduct: { data: { _id: string } };
  }
) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
      };
    case CREATE_PRODUCT:
      const newProduct = action.createdProduct;
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
      };
    case SHOW_PRODUCT:
      return {
        ...state,
        showProduct: action.productData.data,
      };
    case UPDATE_PRODUCT:
      const oldShowProductData = state.showProduct;
      const updatedShowProductData = action.updatedProduct.data;
      const updatedShowProduct = {
        ...oldShowProductData,
        ...updatedShowProductData,
      };
      const availableProductIndex = state.availableProducts.findIndex(
        (prod: { _id: string }) => prod._id === updatedShowProductData._id
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedShowProductData;
      return {
        ...state,
        showProduct: updatedShowProduct,
        availableProducts: updatedAvailableProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product: { _id: string }) =>
            product._id !== action.deletedProduct.data._id
        ),
      };
  }
  return state;
};
