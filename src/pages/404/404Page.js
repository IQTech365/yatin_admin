import React from "react";
import { Result, Button } from "antd";
import {Link, useNavigate} from 'react-router-dom';
import RouteKeys from "../../routes/RouteKeys";

const Error404Page = (props) => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={()=> {navigate(RouteKeys.home)}}>Back Home</Button>}
    />
  );
};

export default Error404Page;
