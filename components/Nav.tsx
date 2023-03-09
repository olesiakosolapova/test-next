import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
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

interface StoreState {
  links: MenuItem[];
}

// Define the action types
export const FETCH_MENU_SUCCESS = "FETCH_MENU_SUCCESS";
export const FETCH_MENU_FAILURE = "FETCH_MENU_FAILURE";
export const FETCH_MENU = "FETCH_MENU";

interface FetchMenuAction {
  type: typeof FETCH_MENU;
}

// Define the action interfaces
interface FetchMenuSuccessAction {
  type: typeof FETCH_MENU_SUCCESS;
  payload: MenuItem[];
}

interface FetchMenuFailureAction {
  type: typeof FETCH_MENU_FAILURE;
  payload: string;
}

type MenuAction =
  | FetchMenuSuccessAction
  | FetchMenuFailureAction
  | FetchMenuAction;

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
export const fetchMenu = (): ThunkAction<
  Promise<void>,
  StoreState,
  undefined,
  MenuAction
> => {
  return async (dispatch: ThunkDispatch<StoreState, undefined, MenuAction>) => {
    dispatch({ type: FETCH_MENU }); // Dispatch FetchMenuAction to indicate the async fetch action has started
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

export const Nav = () => {
  const links: MenuItem[] = useSelector((state: StoreState) => state.links);
  const dispatch =
    useDispatch<ThunkDispatch<StoreState, undefined, MenuAction>>();

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  return (
    <nav>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: "1rem",
          fontSize: "1.5rem",
        }}
      >
        {links?.map((link) => (
          <li key={link.name}>
            <Link href={`${link.uri}`}>{link.name}</Link>
          </li>
        ))}
      </div>
    </nav>
  );
};
