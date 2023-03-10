import { NavbarAction, StoreState, FETCH_NAVBAR_SUCCESS } from "./interfaces";

const initialState: StoreState = {
  links: [],
};

export const navbarReducer = (state = initialState, action: NavbarAction) => {
  switch (action.type) {
    case FETCH_NAVBAR_SUCCESS:
      return { ...state, links: action.payload };
    default:
      return state;
  }
};
