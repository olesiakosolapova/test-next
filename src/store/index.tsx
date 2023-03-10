import {
  combineReducers,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import axios from "axios";
import { footerReducer } from "./footerReducer";
import {
  NavbarAction,
  NavbarApiResponse,
  NavbarItem,
  StoreState,
  FETCH_NAVBAR,
  FETCH_NAVBAR_FAILURE,
  FETCH_NAVBAR_SUCCESS,
  FetchNavbarSuccessAction,
  FetchNavbarFailureAction,
} from "./interfaces";
import { navbarReducer } from "./navbarReducer";
import {
  FooterData,
  StoreStateFooter,
  FooterAction,
  FETCH_FOOTER,
  FETCH_FOOTER_SUCCESS,
  FETCH_FOOTER_FAILURE,
  FetchFooterSuccessAction,
  FetchFooterFailureAction,
} from "./interfaces";

export const fetchNavbarSuccess = (
  links: NavbarItem[]
): FetchNavbarSuccessAction => {
  return {
    type: FETCH_NAVBAR_SUCCESS,
    payload: links,
  };
};

export const fetchNavbarFailure = (error: string): FetchNavbarFailureAction => {
  return {
    type: FETCH_NAVBAR_FAILURE,
    payload: error,
  };
};

export const fetchFooterSuccess = (
  data: FooterData | null
): FetchFooterSuccessAction => {
  return {
    type: FETCH_FOOTER_SUCCESS,
    payload: data,
  };
};

export const fetchFooterFailure = (error: string): FetchFooterFailureAction => {
  return {
    type: FETCH_FOOTER_FAILURE,
    payload: error,
  };
};

export const fetchNavbar = (): ThunkAction<
  Promise<void>,
  StoreState,
  undefined,
  NavbarAction
> => {
  return async (
    dispatch: ThunkDispatch<StoreState, undefined, NavbarAction>
  ) => {
    dispatch({ type: FETCH_NAVBAR });
    try {
      const res = await axios.get<NavbarApiResponse>(
        "https://acecmsmock.z6.web.core.windows.net/api/content/2"
      );
      const response = res.data.data;
      dispatch(fetchNavbarSuccess(response.items));
    } catch (error: any) {
      console.error(error);
      dispatch(fetchNavbarFailure(error.message));
    }
  };
};

export const fetchFooter = (): ThunkAction<
  Promise<void>,
  StoreStateFooter,
  undefined,
  FooterAction
> => {
  return async (
    dispatch: ThunkDispatch<StoreStateFooter, undefined, FooterAction>
  ) => {
    dispatch({ type: FETCH_FOOTER });
    try {
      const res = await axios.get<FooterData | null>(
        "https://acecmsmock.z6.web.core.windows.net/api/content/1"
      );
      const data = res.data;
      dispatch(fetchFooterSuccess(data));
    } catch (error: any) {
      console.error(error);
      dispatch(fetchFooterFailure(error.message));
    }
  };
};

export const rootReducer = combineReducers({
  navbar: navbarReducer,
  footer: footerReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
