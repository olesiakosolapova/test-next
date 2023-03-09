import { configureStore, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import axios from "axios";

export interface FooterLink {
  name: string;
  url: string;
}

export interface FooterColumn {
  links: FooterLink[];
}

export interface FooterData {
  id: number;
  name: string;
  slug: string;
  locale: string;
  publishDate: string;
  web: {
    id: number;
  };
  data: {
    columns: FooterColumn[];
    address: string;
    facebook: string;
    twitter: string;
    youtube: string;
    instagram: string;
    copyright: string;
  };
}

export interface StoreStateFooter {
  data: FooterData[];
}

export const FETCH_MENU_SUCCESS_FOOTER = "FETCH_MENU_SUCCESS_FOOTER";
export const FETCH_MENU_FAILURE = "FETCH_MENU_FAILURE";
export const FETCH_MENU = "FETCH_MENU";

interface FetchMenuAction {
  type: typeof FETCH_MENU;
}

interface FetchMenuSuccessActionFooter {
  type: typeof FETCH_MENU_SUCCESS_FOOTER;
  payload: FooterData[];
}

interface FetchMenuFailureAction {
  type: typeof FETCH_MENU_FAILURE;
  payload: string;
}

export type MenuAction =
  | FetchMenuFailureAction
  | FetchMenuSuccessActionFooter
  | FetchMenuAction;

const initialStateFooter: StoreStateFooter = {
  data: [],
};

export const menuReducerFooter = (
  state = initialStateFooter,
  action: MenuAction
) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESS_FOOTER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const fetchMenuSuccessFooter = (
  data: FooterData[]
): FetchMenuSuccessActionFooter => {
  return {
    type: FETCH_MENU_SUCCESS_FOOTER,
    payload: data,
  };
};

export const fetchMenuFailure = (error: string): FetchMenuFailureAction => {
  return {
    type: FETCH_MENU_FAILURE,
    payload: error,
  };
};

export const fetchMenuFooter = (): ThunkAction<
  Promise<void>,
  StoreStateFooter,
  undefined,
  MenuAction
> => {
  return async (
    dispatch: ThunkDispatch<StoreStateFooter, undefined, MenuAction>
  ) => {
    dispatch({ type: FETCH_MENU }); // Dispatch FetchMenuAction to indicate the async fetch action has started
    try {
      const res = await axios.get<FooterData[]>(
        "https://acecmsmock.z6.web.core.windows.net/api/content/1"
      );
      const data = res.data;
      dispatch(fetchMenuSuccessFooter(data));
    } catch (error: any) {
      console.error(error);
      dispatch(fetchMenuFailure(error.message));
    }
  };
};

export const storef = configureStore({
  reducer: menuReducerFooter,
  middleware: [thunk],
});

export default storef;
