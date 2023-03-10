import {
  FooterAction,
  StoreStateFooter,
  FETCH_FOOTER_SUCCESS,
} from "./interfaces";

const initialStateFooter: StoreStateFooter = {
  data: null,
};

export const footerReducer = (
  state = initialStateFooter,
  action: FooterAction
) => {
  switch (action.type) {
    case FETCH_FOOTER_SUCCESS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
