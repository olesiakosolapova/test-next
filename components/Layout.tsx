import React from "react";
import { Footer } from "./Footer";
import { Footer2 } from "./Footer2";
import { Navbar } from "./Navbar";
import { Nav } from "./Nav";
import { Provider } from "react-redux";
import store from "@/store";
import storef from "@/store/indexfoter";

type propsChildren = {
  children: any;
};
export const Layout = (props: propsChildren) => {
  return (
    <div>
      {/* <Navbar /> */}
      <Provider store={store}>
        <Nav />
      </Provider>
      {props.children}
      <Provider store={storef}>
        <Footer2 />
      </Provider>
      {/* <Footer /> */}
    </div>
  );
};
