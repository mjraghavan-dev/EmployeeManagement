import React from 'react';
import { Modal, Typography, Row, Col } from 'antd';

const { Text } = Typography;

const EmployeeViewModal = ({ visible, onClose, employee }) => {
  return (
    <Modal
      title="View Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Row className="mb-3">
        <Col span={12}>
          <Text strong>Name:</Text> {employee.name}
        </Col>
        <Col span={12}>
          <Text strong>Email:</Text> {employee.email}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={12}>
          <Text strong>Phone:</Text> {employee.phone}
        </Col>
        <Col span={12}>
          <Text strong>Date of Birth:</Text> {employee.dob}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={12}>
          <Text strong>City:</Text> {employee.city}
        </Col>
        <Col span={12}>
          <Text strong>State:</Text> {employee.state}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={12}>
          <Text strong>Postal Code:</Text> {employee.postalCode}
        </Col>
        <Col span={12}>
          <Text strong>Role:</Text> {employee.role}
        </Col>
      </Row>
    </Modal>
  );
};

export default EmployeeViewModal;
