import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import axios from "axios";

// Define the interfaces for the store state and the API response
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

interface StoreState {
  links: MenuItem[];
}

// Define the action types
export const FETCH_MENU_SUCCESS = "FETCH_MENU_SUCCESS";
export const FETCH_MENU_FAILURE = "FETCH_MENU_FAILURE";

// Define the action interfaces
interface FetchMenuSuccessAction {
  type: typeof FETCH_MENU_SUCCESS;
  payload: MenuItem[];
}

interface FetchMenuFailureAction {
  type: typeof FETCH_MENU_FAILURE;
  payload: string;
}

type MenuAction = FetchMenuSuccessAction | FetchMenuFailureAction;

// Define the initial store state
const initialState: StoreState = {
  links: [],
};

// Define the Redux reducer
export const menuReducer = (state = initialState, action: MenuAction) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESS:
      return { ...state, links: action.payload };
    default:
      return state;
  }
};

// Define the action creators
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

// Define the async action using thunk middleware
export const fetchMenu = () => {
  return async (dispatch: any) => {
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

const store = configureStore({
  reducer: menuReducer,
  middleware: [thunk],
});

export default store;
