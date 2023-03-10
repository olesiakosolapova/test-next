import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchNavbar, NavbarAction, StoreState } from "@/store";

interface MenuItem {
  name: string;
  uri: string;
}

export const Nav = () => {
  const links: MenuItem[] = useSelector((state: StoreState) => state.links);
  const dispatch =
    useDispatch<ThunkDispatch<StoreState, undefined, NavbarAction>>();

  useEffect(() => {
    dispatch(fetchNavbar());
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
        <Link href="/articles">Articles</Link>
      </div>
    </nav>
  );
};
