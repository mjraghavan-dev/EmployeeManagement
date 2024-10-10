import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Tooltip, Row, Col, Button, Typography, Modal } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EmployeeViewModal from './viewPage'; // Import the modal component
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser } from '../../Redux/actions/emplyeeActions'; // Assuming you have a delete action

const { Title } = Typography;
const { confirm } = Modal;

const columns = (handleView, handleEdit, handleDelete) => [
    {
        title: 'Serial No.',
        key: 'serialNumber',
        render: (_, __, index) => index + 1, // Generating serial number
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Date of Birth',
        dataIndex: 'dob',
        key: 'dob',
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: 'Postal Code',
        dataIndex: 'postalCode',
        key: 'postalCode',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (role) => (
            <>
                <Tag color="blue" key={role}>
                    {role.toUpperCase()}
                </Tag>
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Tooltip title="View">
                    <EyeOutlined style={{ color: 'green' }} onClick={() => handleView(record)} />
                </Tooltip>
                <Tooltip title="Edit">
                    <EditOutlined style={{ color: 'blue' }} onClick={() => handleEdit(record)} />
                </Tooltip>
                <Tooltip title="Delete">
                    <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(record)} />
                </Tooltip>
            </Space>
        ),
    },
];

const HomeIndex = () => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();
    const { employeeList } = useSelector((state) => state.employees);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    // Handle viewing employee details
    const handleView = (record) => {
        setSelectedEmployee(record);
        setOpenModal(true);
    };

    // Handle closing modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedEmployee(null);
    };

    // Handle edit action
    const handleEdit = (record) => {
        navigate(`/employee/edit/${record.id}`);
    };

    // Show delete confirmation popup
    const handleDelete = (record) => {
        confirm({
            title: 'Are you sure you want to delete this user?',
            content: `User: ${record.name}`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                // Dispatch the delete action here
                dispatch(deleteUser(record.id));
            },
            onCancel() {
                console.log('Cancel delete');
            },
        });
    };

    const handleAddEmployee = () => {
        navigate('/employee/add');
    };

    return (
        <div>
            {/* Header with Button */}
            <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
                <Col>
                    <Title level={3}>Employee Listing</Title>
                </Col>
                <Col>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEmployee}>
                        Add Employee
                    </Button>
                </Col>
            </Row>

            {/* Employee Table */}
            <Table columns={columns(handleView, handleEdit, handleDelete)} dataSource={employeeList} />

            {/* Employee View Modal */}
            {selectedEmployee && (
                <EmployeeViewModal visible={openModal} onClose={handleCloseModal} employee={selectedEmployee} />
            )}
        </div>
    );
};

export default HomeIndex;
