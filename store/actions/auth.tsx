import { AsyncStorage } from 'react-native';

import axios from 'axios';

export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId: string, token: string) => {
  return (
    dispatch: (arg0: { type: string; userId: string; token: string }) => void
  ) => {
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (userData: any) => {
  return async (dispatch: any) => {
    const response = await fetch('https://e-papi-api.herokuapp.com/register', {
      method: 'POST',
    });

    const resData = await response;
    console.log(resData);
    // dispatch(authenticate(resData.data.userId, resData.data.token));
  };
};
