export interface NavbarItem {
  name: string;
  uri: string;
}

export interface NavbarData {
  items: NavbarItem[];
}

export interface NavbarApiResponse {
  id: number;
  name: string;
  slug: string;
  locale: string;
  publishDate: string;
  web: {
    id: number;
  };
  data: NavbarData;
}

export interface StoreState {
  links: NavbarItem[];
}

export const FETCH_NAVBAR_SUCCESS = "FETCH_NAVBAR_SUCCESS";
export const FETCH_NAVBAR_FAILURE = "FETCH_NAVBAR_FAILURE";
export const FETCH_NAVBAR = "FETCH_NAVBAR";

export interface FetchNavbarAction {
  type: typeof FETCH_NAVBAR;
}

export interface FetchNavbarSuccessAction {
  type: typeof FETCH_NAVBAR_SUCCESS;
  payload: NavbarItem[];
}

export interface FetchNavbarFailureAction {
  type: typeof FETCH_NAVBAR_FAILURE;
  payload: string;
}

export type NavbarAction =
  | FetchNavbarSuccessAction
  | FetchNavbarFailureAction
  | FetchNavbarAction;

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
  data: FooterData | null;
}
export const FETCH_FOOTER_SUCCESS = "FETCH_FOOTER_SUCCESS";
export const FETCH_FOOTER_FAILURE = "FETCH_FOOTER_FAILURE";
export const FETCH_FOOTER = "FETCH_FOOTER";

export interface FetchFooterAction {
  type: typeof FETCH_FOOTER;
}

export interface FetchFooterSuccessAction {
  type: typeof FETCH_FOOTER_SUCCESS;
  payload: FooterData | null;
}

export interface FetchFooterFailureAction {
  type: typeof FETCH_FOOTER_FAILURE;
  payload: string;
}

export type FooterAction =
  | FetchFooterFailureAction
  | FetchFooterSuccessAction
  | FetchFooterAction;
