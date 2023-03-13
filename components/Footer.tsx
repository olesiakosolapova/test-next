import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchFooter } from "@/store/index";
import { StoreStateAll, FooterAction } from "@/store/interfaces";
import { FooterData } from "@/store/interfaces";

export const Footer = () => {
  const data: FooterData | null = useSelector(
    (state: StoreStateAll) => state.footer.data
  );
  console.log(data);
  const dispatch =
    useDispatch<ThunkDispatch<StoreStateAll, undefined, FooterAction>>();

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
