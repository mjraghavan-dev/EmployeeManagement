import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { TextField, MenuItem, Button } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import { DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './index.css'; // Import the custom CSS
import { useDispatch } from 'react-redux';
import { addUser, getOneEmployee, UpdateUser } from '../../Redux/actions/emplyeeActions';

function EmployeeForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dob: null,
        city: '',
        state: '',
        postalCode: '',
        role: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (window.location.pathname.includes("edit")) {
            const arr = window.location.pathname.split("/")
            dispatch(getOneEmployee(arr[arr.length - 1], setFormData))
        }
    }, [])



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (date, dateString) => {
        console.log(dateString);
        setFormData({
            ...formData,
            dob: dateString,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.location.pathname.includes("edit")) {
            const arr = window.location.pathname.split("/")
            const { password, id, ...updatedFormData } = formData;                      
            dispatch(UpdateUser(arr[arr.length - 1], updatedFormData, navigate))
        } else {
            dispatch(addUser(formData, navigate))
        }
    };

    // Handle "Back to List" button click
    const handleBackToList = () => {
        navigate('/home'); // Navigate back to the list view (replace with the correct route)
    };

    return (
        <div className='parent-container'>
            <Container className="emp-form-container mt-4">
                {/* Back to List Button */}
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleBackToList}
                    className="mb-4 backBtn"
                >
                    <FaArrowLeft /> <span>Back to List</span>
                </Button>

                <h1 className='mb-3 headerText'>Create Employee</h1>
                <form onSubmit={handleSubmit}>
                    <Row className="mb-3 fullwidth">
                        <Col xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                className="form-field"
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                variant="outlined"
                                required
                                className="form-field"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3 fullwidth">
                        <Col xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                className="form-field"
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <DatePicker
                                onChange={handleDateChange}
                                format="MM/DD/YYYY"
                                style={{ width: '100%' }}
                                placeholder="Date of Birth"
                                required
                                className="form-field"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3 fullwidth">
                        <Col xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                className="form-field"
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                className="form-field"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3 fullwidth">
                        <Col xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Postal Code"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                className="form-field"
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                className="form-field dropdown"
                            >
                                <MenuItem value={0}>Admin</MenuItem>
                                <MenuItem value={1}>User</MenuItem>
                            </TextField>
                        </Col>
                    </Row>
                    {!window.location.pathname.includes("edit") && (
                        <Row className="mb-3 fullwidth">
                            <Col xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    variant="outlined"
                                    required
                                    className="form-field"
                                />
                            </Col>
                        </Row>
                    )}
                    <Button variant="contained" color="primary" type="submit" className="submit-btn">
                        Submit
                    </Button>
                </form>
            </Container>
        </div>
    );
}

export default EmployeeForm;
