import { configureStore, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import axios from "axios";

interface MenuItem {
  name: string;
  uri: string;
}

interface MenuData {
  items: MenuItem[];
}

interface MenuApiResponse {
  id: number;
  name: string;
  slug: string;
  locale: string;
  publishDate: string;
  web: {
    id: number;
  };
  data: MenuData;
}

export interface StoreState {
  links: MenuItem[];
}

export const FETCH_MENU_SUCCESS = "FETCH_MENU_SUCCESS";
export const FETCH_MENU_FAILURE = "FETCH_MENU_FAILURE";
export const FETCH_MENU = "FETCH_MENU";

interface FetchMenuAction {
  type: typeof FETCH_MENU;
}

interface FetchMenuSuccessAction {
  type: typeof FETCH_MENU_SUCCESS;
  payload: MenuItem[];
}

interface FetchMenuFailureAction {
  type: typeof FETCH_MENU_FAILURE;
  payload: string;
}

export type MenuAction =
  | FetchMenuSuccessAction
  | FetchMenuFailureAction
  | FetchMenuAction;

const initialState: StoreState = {
  links: [],
};

export const menuReducer = (state = initialState, action: MenuAction) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESS:
      return { ...state, links: action.payload };
    default:
      return state;
  }
};

export const fetchMenuSuccess = (links: MenuItem[]): FetchMenuSuccessAction => {
  return {
    type: FETCH_MENU_SUCCESS,
    payload: links,
  };
};

export const fetchMenuFailure = (error: string): FetchMenuFailureAction => {
  return {
    type: FETCH_MENU_FAILURE,
    payload: error,
  };
};

export const fetchMenu = (): ThunkAction<
  Promise<void>,
  StoreState,
  undefined,
  MenuAction
> => {
  return async (dispatch: ThunkDispatch<StoreState, undefined, MenuAction>) => {
    dispatch({ type: FETCH_MENU });
    try {
      const res = await axios.get<MenuApiResponse>(
        "https://acecmsmock.z6.web.core.windows.net/api/content/2"
      );
      const response = res.data.data;
      dispatch(fetchMenuSuccess(response.items));
    } catch (error: any) {
      console.error(error);
      dispatch(fetchMenuFailure(error.message));
    }
  };
};

export const store = configureStore({
  reducer: menuReducer,
  middleware: [thunk],
});

export default store;
