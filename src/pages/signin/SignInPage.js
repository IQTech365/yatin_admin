import React from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import * as Actions from "../../redux/actions/Action";

const SignInPage = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const _onFinish = (values) => {
    console.log(values);
    dispatch(Actions.signInAsync(values));
  };

  return (
    <Row
      align="middle"
      justify="center"
      typeof=""
      style={{ minHeight: "100vh" }}
    >
      <Col span={6}>
        <Form form={form} name="login-form" onFinish={_onFinish}>
          <Form.Item name="email" rules={[{ required: true }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input placeholder="Password" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 6, offset: 0 }}>
            <Button type="primary" htmlType="submit">
              SignIn
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignInPage;
