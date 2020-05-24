import axios from '../../axios-order';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SHOW_PRODUCT = 'SHOW_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const fetchProducts = () => {
  return async (
    dispatch: (arg0: { type: string; products: object }) => void
  ) => {
    try {
      const response = await axios.get('/products');

      const loadedProducts = await response.data;

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (addproductData: object) => {
  return async (
    dispatch: (arg0: { type: string; createdProduct: object }) => void,
    getState: () => {
      auth: { (): string; new (): string; token: string };
    }
  ) => {
    const token = getState().auth.token;

    const response = await axios.post('/products', addproductData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = response.data;

    dispatch({
      type: CREATE_PRODUCT,
      createdProduct: resData,
    });
  };
};

export const fetchProductById = (id: string) => {
  return async (
    dispatch: (arg0: { type: string; productData: { data: object } }) => void
  ) => {
    const response = await axios.get(`/products/${id}`);

    const resData = await response.data;

    dispatch({
      type: SHOW_PRODUCT,
      productData: { data: resData },
    });
  };
};

export const updateProduct = (id: string, updateProductData: object) => {
  return async (
    dispatch: (arg0: {
      type: string;
      updatedProduct: { data: object };
    }) => void,
    getState: () => {
      auth: { (): string; new (): string; token: string };
    }
  ) => {
    const token = getState().auth.token;

    const response = await axios.patch(`/products/${id}`, updateProductData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = await response.data;

    dispatch({
      type: UPDATE_PRODUCT,
      updatedProduct: { data: resData },
    });
  };
};

export const deleteProduct = (id: string) => {
  return async (
    dispatch: (arg0: {
      type: string;
      deletedProduct: { data: object };
    }) => void,
    getState: () => {
      auth: { (): string; new (): string; token: string };
    }
  ) => {
    const token = getState().auth.token;
    const response = await axios.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = await response.data;

    dispatch({
      type: DELETE_PRODUCT,
      deletedProduct: { data: resData },
    });
  };
};
