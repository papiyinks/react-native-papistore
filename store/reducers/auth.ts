import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState: { token: string; userId: string } = {
  token: '',
  userId: '',
};

export default (
  state = initialState,
  action: { type: string; token: string; userId: string }
) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
