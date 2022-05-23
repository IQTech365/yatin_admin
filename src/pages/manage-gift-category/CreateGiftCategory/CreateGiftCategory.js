import React from "react";
import { Button, Form, Input, Row, Col, Typography, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/actions/gift.catgorey.action";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CreateGiftCategory = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isCreateUserRequesting } = useSelector((state) => state.User);
  const onFinish = (values) => {
    console.log("Success:", values);
    const data = {category_name: values.category};
    dispatch(Actions.createGiftCategoryAsync(data));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col span={2}>
          <Button
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate(-1);
            }}
          />
        </Col>
        <Col span={22}>
          <Typography.Title level={5} style={{padding: 0}}>
            Create New Gift Category
          </Typography.Title>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
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
              label="Category Name"
              name="category"
              rules={[{ required: true, message: "Please enter gift category name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 22 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CreateGiftCategory;
