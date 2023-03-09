import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Nav } from "./Nav";
import { Provider } from "react-redux";
import store from "@/store";

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
      <Footer />
    </div>
  );
};
