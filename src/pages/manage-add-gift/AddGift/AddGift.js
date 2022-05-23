import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Typography,
  Divider,
  Select,
  Checkbox,
} from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/actions/gift.catgorey.action";
import * as AddGiftActions from "../../../redux/actions/gift.add.action";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AddGift = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isCreateUserRequesting } = useSelector((state) => state.User);
  const { giftCategories = [] } = useSelector((state) => state.GiftCategory);
  const [selectedGiftCategory, setSelectedGiftCategory] = useState(null);

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(AddGiftActions.addGiftAsync(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const _onGiftCategoreyChange = (e) => {
    setSelectedGiftCategory(e?.target?.value);
  };

  useEffect(() => {
    dispatch(Actions.getAllGiftCategoryAsync({}));
  }, []);

  return (
    <>
      <Row>
        <Col span={24}>
          <Button
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate(-1);
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Typography>
            Please choose product from Amazon Affiliate Program and copy the
            Link of Image & Text in given below fields respectively.
          </Typography>
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
            <Form.Item name="gift_category">
              <Checkbox.Group
                onChange={(values) => {
                  console.log("values--", values);
                }}
              >
                {giftCategories.map((el, i) => {
                  return (
                    <Checkbox key={i} value={el.category_name}>
                      {el?.category_name}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="Image Link"
              name="gift_image_url"
              rules={[{ required: true, message: "Please enter image url" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="URL Link"
              name="gift_text_url"
              rules={[{ required: true, message: "Please enter text url" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Text"
              name="gift_text"
              rules={[{ required: true, message: "Please enter text" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
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

AddGift.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddGift;
