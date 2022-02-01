import React from "react";
import "./App.less";
import "video-react/dist/video-react.css";
import store from "../src/redux/store";
import { Provider } from "react-redux";
import Route from "./Route";

function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

export default App;
