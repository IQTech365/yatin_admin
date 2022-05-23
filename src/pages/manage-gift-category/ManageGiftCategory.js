import React from "react";
import { Button, Table, Divider, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../redux/actions/gift.catgorey.action";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RouteKeys from "../../routes/RouteKeys";

const ManageGift = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { giftCategories, isGetUsersRequesting } = useSelector((state) => state.GiftCategory);

  const columns = [
    {
      title: "Gift Category Name",
      dataIndex: "category_name",
      key: "category_name",
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
                  // _onViewUserClick(record);
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
    dispatch(Actions.getAllGiftCategoryAsync({}));
  }, []);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          navigate(RouteKeys.createGiftCategory);
        }}
      >
        Create Gift Category
      </Button>

      <Divider />
      <section>
        <Table
          dataSource={giftCategories}
          columns={columns}
          loading={isGetUsersRequesting}
        />
      </section>
    </div>
  );
};

export default ManageGift;
