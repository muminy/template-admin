import { SET_USER_TOKEN } from "store/types";

const initialState = {
  token: null,
};

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case SET_USER_TOKEN:
      return { token: action.payload };
    default:
      return state;
  }
}
