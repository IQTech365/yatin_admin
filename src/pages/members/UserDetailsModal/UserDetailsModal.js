import React from "react";
import { Col, Modal, Row, Typography } from "antd";
import PropTypes from "prop-types";

const UserDetailsModal = (props) => {
  const { visible, onCancel, user } = props;

  return (
    <Modal
      title="User Details"
      visible={visible}
      centered
      onOk={() => {}}
      onCancel={onCancel}
      footer={null}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-center",
        }}
      >
        <Row>
          <Col>
            <b>Name:</b>
          </Col>
          <Col>
            <Typography.Text>{user?.name}</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <b>Email:</b>
          </Col>
          <Col>
            <Typography.Text>{user?.email}</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <b>Role:</b>
          </Col>
          <Col>
            <Typography.Text>{user?.role}</Typography.Text>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

UserDetailsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  user: PropTypes.any,
};

export default UserDetailsModal;
