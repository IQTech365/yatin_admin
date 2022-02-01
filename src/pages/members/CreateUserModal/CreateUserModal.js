import React from "react";
import { Modal, Button, Form, Input } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/actions/Action";

const CreateUserModal = (props) => {
  const dispatch = useDispatch();
  const { isCreateUserRequesting } = useSelector((state) => state.User);
  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(Actions.createUserRequestAsync(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Create New User"
      style={{ top: 20 }}
      visible={props.visible}
      centered
      onOk={() => {}}
      onCancel={props.onCancel}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 20 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateUserModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CreateUserModal;
