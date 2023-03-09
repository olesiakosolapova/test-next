import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  fetchMenuFooter,
  MenuAction,
  StoreStateFooter,
} from "@/store/indexfoter";

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
  const data: FooterData[] = useSelector(
    (state: StoreStateFooter) => state.data
  );
  console.log(data);
  const dispatch =
    useDispatch<ThunkDispatch<StoreStateFooter, undefined, MenuAction>>();

  useEffect(() => {
    dispatch(fetchMenuFooter());
  }, []);
  return (
    <footer
      style={{ backgroundColor: "#f5f5f5", padding: "20px", marginTop: "50px" }}
    >
      {data.length > 0 ? <div>{data[0].name}</div> : <div>Loading...</div>}
    </footer>
  );
};
