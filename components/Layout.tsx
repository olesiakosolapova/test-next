import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Provider } from "react-redux";
import store from "@/store";

type propsChildren = {
  children: any;
};
export const Layout = (props: propsChildren) => {
  return (
    <div>
      <Provider store={store}>
        <Navbar />
        {props.children}
        <Footer />
      </Provider>
    </div>
  );
};
