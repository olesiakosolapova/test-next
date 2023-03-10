import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchFooter } from "@/store/index";
import { StoreStateFooter, FooterAction } from "@/store/interfaces";

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

export const Footer2 = () => {
  const data: FooterData | null = useSelector(
    (state: StoreStateFooter) => state.data
  );
  console.log(data);
  const dispatch =
    useDispatch<ThunkDispatch<StoreStateFooter, undefined, FooterAction>>();

  useEffect(() => {
    dispatch(fetchFooter());
  }, [dispatch]);
  if (!data) return null;
  return (
    <footer
      style={{ backgroundColor: "#f5f5f5", padding: "20px", marginTop: "50px" }}
    >
      {data.data.columns.map(({ links }) => {
        return (
          <ul>
            {" "}
            {links.map(({ name, url }) => {
              return <li key={name}>{name}</li>;
            })}
          </ul>
        );
      })}
    </footer>
  );
};
