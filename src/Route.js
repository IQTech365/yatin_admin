import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./redux/actions/Action";
import {message} from 'antd';

const Route = (props) => {
  const { isLoggedIn } = useSelector((state) => state.User);
  const { show, text, type } = useSelector((state) => state.Alert);
  const dispatch = useDispatch();

  const _onClose = () => {
    dispatch(Actions.hideAlert());
  };

  React.useEffect(() => {
    if (show) {
      if (type === "success") {
        message.success(text).then(() => {
          _onClose();
        });
      } else {
        message.error(text).then(() => {
          _onClose();
        });
      }
    }
  }, [show]);

  return (
    <>
      <Router>
        <Routes isAuth={isLoggedIn} />
      </Router>
    </>
  );
};

export default Route;
