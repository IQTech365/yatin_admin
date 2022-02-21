import React from "react";
import { Button, Table, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../redux/actions/Action";
import { DeleteFilled, EyeFilled } from "@ant-design/icons";

const MediaLinkPage = (props) => {
  const dispatch = useDispatch();
  const { allMedia } = useSelector((state) => state.Groups);

  const columns = [
    {
      title: "Media ID",
      dataIndex: "media_id",
      key: "media_id",
    },
    {
      title: "Media Link",
      dataIndex: "media_link",
      key: "media_link",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => {
    //     return (
    //       <Space size="large">
    //         <Tooltip title="View">
    //           <Button
    //             shape="circle"
    //             icon={<EyeFilled />}
    //             onClick={() => {
    //               // _onViewUserClick(record);
    //             }}
    //           />
    //         </Tooltip>
    //         <Tooltip title="Delete">
    //           <Button shape="circle" icon={<DeleteFilled />} />
    //         </Tooltip>
    //       </Space>
    //     );
    //   },
    // },
  ];

  React.useEffect(() => {
    dispatch(Actions.getAllMediaRequestAsync({}));
  }, []);

  return (
    <div>
      <section>
        <Table
          dataSource={allMedia}
          columns={columns}
          // loading={isGetUsersRequesting}
        />
      </section>
    </div>
  );
};

export default MediaLinkPage;
