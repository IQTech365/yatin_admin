import React from "react";
import { Button, Table, Divider, Space, Tooltip } from "antd";
import CreateUserModal from "./CreateUserModal/CreateUserModal";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../redux/actions/Action";
import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import UserDetailsModal from "./UserDetailsModal/UserDetailsModal";

const MembersPage = (props) => {
  const dispatch = useDispatch();
  const { users, isGetUsersRequesting } = useSelector((state) => state.User);
  const [openModal, setOpenModal] = React.useState(false);
  const [openUserDetailsModal, setOpenUserDetailsModal] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const _onCancel = () => {
    setOpenModal(false);
  };

  const _onCancelUserDetailModal = () => {
    setOpenUserDetailsModal(false);
    setUser(null);
  };

  const _onViewUserClick = (data) => {
    setUser(data);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="large">
            <Tooltip title="View">
              <Button
                shape="circle"
                icon={<EyeFilled />}
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

  React.useEffect(() => {
    if (user) {
      setOpenUserDetailsModal(true);
    }
  }, [user]);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Create
      </Button>

      <Divider />
      <section>
        <Table
          dataSource={users}
          columns={columns}
          loading={isGetUsersRequesting}
        />
      </section>
      <CreateUserModal visible={openModal} onCancel={_onCancel} />
      <UserDetailsModal
        visible={openUserDetailsModal}
        onCancel={_onCancelUserDetailModal}
        user={user}
      />
    </div>
  );
};

export default MembersPage;
