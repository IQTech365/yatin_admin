import React from "react";
import { Button, Table, Divider, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../redux/actions/Action";
import * as AddGiftActions from "../../redux/actions/gift.add.action";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RouteKeys from "../../routes/RouteKeys";

const ManageAddGift = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gifts, isGetUsersRequesting } = useSelector((state) => state.GiftAdd);
  const [user, setUser] = React.useState(null);

  const _onViewUserClick = (data) => {
    setUser(data);
  };

  React.useEffect(() => {
    dispatch(AddGiftActions.getAllGiftAsync({}));
  }, []);

  const columns = [
    {
      title: "Category",
      dataIndex: "gift_category",
      key: "gift_category",
    },
    {
      title: "Image",
      dataIndex: "gift_image_url",
      key: "gift_image_url",
      render: (text, record) => {
        console.log("text--", text);
        return (
          <img src={text} style={{width: 100, height: 100}}/>
        );
      }
    },
    {
      title: "Text",
      dataIndex: "gift_text_url",
      key: "gift_text_url",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="large">
            <Tooltip title="Edit">
              <Button
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => {
                  _onViewUserClick(record);
                }}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button shape="circle" icon={<DeleteFilled />} />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  React.useEffect(() => {
    dispatch(Actions.getUsersRequestAsync({}));
  }, []);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          navigate(RouteKeys.addGift);
        }}
      >
        Add Gift
      </Button>

      <Divider />
      <section>
        <Table
          dataSource={gifts}
          columns={columns}
          loading={isGetUsersRequesting}
        />
      </section>
    </div>
  );
};

export default ManageAddGift;
