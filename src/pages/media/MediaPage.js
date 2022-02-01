import React from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Select,
  Radio,
  Alert,
  Row,
  Col,
} from "antd";
import { useDispatch } from "react-redux";
import * as Actions from "../../redux/actions/Action";
import ReactPlayer from "react-player";

const MediaPage = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [numberOfTextInputs, setNumberOfTextInputs] = React.useState(0);
  const [groups, setGroups] = React.useState([]);
  const [groupCreated, setGroupCreated] = React.useState(false);
  const [videoFilePath, setVideoFilePath] = React.useState(null);
  const _onFinish = (values) => {
    console.log(`Form-Data- ${JSON.stringify(values)}`);
    const _tempArr = groups;
    _tempArr.push(values);
    setGroups(_tempArr);
    setGroupCreated(true);
    form.resetFields();
  };

  const _onChangeGroup = (value) => {
    setNumberOfTextInputs(value);
  };

  const _onAlertClose = () => {
    setGroupCreated(false);
  };

  const _saveGroups = () => {
    const intervals = groups.map((el) => {
      const item = parseInt(el.interval);
      return item;
    });
    const data = {
      group_count: groups.length,
      groups: groups,
      intervals: intervals,
    };
    dispatch(Actions.saveGroups(data));
  };

  const _onFileSelect = (e) => {
    setVideoFilePath(e.target.files[0]);
  };

  const input = {
    name: "input",
    font_size: "font_size",
    font_color: "font_color",
    placeholder: "Enter text",
    position: "top",
  };

  return (
    <>
      {videoFilePath && <ReactPlayer
        url={URL.createObjectURL(videoFilePath)}
        width="100%"
        height="100%"
        controls={true}
      />}
      <br></br>
      <Row>
        <Col><b>Total Groups:</b> {groups.length}</Col>
      </Row>
      <Row>
        <Col>Choose Video File:</Col>
        <Col>
          <Input type={"file"} onChange={_onFileSelect} />
        </Col>
      </Row>
      <Typography.Title level={4}>Create Group</Typography.Title>
      {groupCreated && (
        <Alert
          message="Group Created"
          type="success"
          showIcon
          closable
          onClose={_onAlertClose}
          style={{ width: 200 }}
        />
      )}
      <br></br>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="control-hooks"
        onFinish={_onFinish}
      >
        <Form.Item name="numberOfInputs" rules={[{ required: true }]}>
          <Select
            placeholder="Number of TextInputs"
            allowClear
            onChange={_onChangeGroup}
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="interval" rules={[{ required: true }]}>
          <Input placeholder="Enter interval in seconds" />
        </Form.Item>
        {Array(parseInt(numberOfTextInputs))
          .fill(input)
          .map((item, index) => {
            return (
              <>
                <Form.Item
                  name={`${item.name}_${index}`}
                  rules={[{ required: true }]}
                  key={index}
                >
                  <Input placeholder={item.placeholder} />
                </Form.Item>
                <Typography.Text>Text Position</Typography.Text><br />
                <Form.Item
                  name={`input_${index}_position`}
                  rules={[{ required: true }]}
                >
                  <Radio.Group>
                    <Radio value={"top"}>Top</Radio>
                    <Radio value={"center"}>Center</Radio>
                    <Radio value={"bottom"}>Bottom</Radio>
                  </Radio.Group>
                </Form.Item>
                <Typography.Text>Font Size</Typography.Text><br />
                <Form.Item
                  name={`input_${index}_size`}
                  rules={[{ required: false }]}
                >
                  <Radio.Group>
                    <Radio value={12}>12</Radio>
                    <Radio value={14}>14</Radio>
                    <Radio value={18}>18</Radio>
                  </Radio.Group>
                </Form.Item>
                <Typography.Text>OR- Enter custom font size below:</Typography.Text><br />
                <Form.Item
                  name={`${item.font_size}_${index}`}
                  rules={[{ required: false }]}
                  key={index}
                >
                  <Input placeholder="Enter your font size" />
                </Form.Item>
                <Typography.Text>Font Color</Typography.Text><br />
                <Form.Item
                  name={`input_${index}_color`}
                  rules={[{ required: false }]}
                >
                  <Radio.Group>
                    <Radio value={"#FF0000"}>Red</Radio>
                    <Radio value={"#2E8BC0"}>Blue</Radio>
                    <Radio value={"#0C2D48"}>Dark Blue</Radio>
                  </Radio.Group>
                </Form.Item>
                <Typography.Text>OR- Enter custom font color below:</Typography.Text><br />
                <Form.Item
                  name={`${item.font_color}_${index}`}
                  rules={[{ required: false }]}
                  key={index}
                >
                  <Input placeholder="#000000" />
                </Form.Item>
              </>
            );
          })}
        <Form.Item wrapperCol={{ span: 8, offset: 0 }}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={_saveGroups}>Save Groups</Button>
    </>
  );
};

export default MediaPage;
