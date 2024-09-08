import React, { useEffect, useCallback, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography, Space, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AddContactForm from '../Form/AddContactForm';
import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const ContactTable = () => {
    const axiosPrivate = useAxiosPrivate();
    const [contacts, setContacts] = useState([]);
    const [showAddContactPrompt, setShowAddContactPrompt] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record._id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record._id);
    };

    const deleteRecord = async (record) => {
        const { _id, ...contactData } = record;

        // Delete Contact API
        if (_id) {
            try {
                const response = await axiosPrivate.delete(`/api/contacts/${_id}`, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                message.success('Delete contact successfully.');
            } catch (error) {
                message.error('Failed to delete contact.');
                console.error("Failed to update contact:", error.message);
            }
        }

        const newContacts = contacts.filter((item) => item._id !== record._id);
        setContacts(newContacts);
        setConfirmDelete(false);
    };

    const handleOk = () => {
        setShowAddContactPrompt(false);
    };

    const handleCancel = () => {
        setShowAddContactPrompt(false);
    };

    const cancel = () => {
        setEditingKey('');
        setConfirmDelete(false);
    };

    // Save edited record
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...contacts];
            const index = newData.findIndex((item) => key === item._id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });

                const { _id, ...contactData } = newData[index];

                // Update Contact API
                if (_id) {
                    try {
                        const response = await axiosPrivate.put(`/api/contacts/${_id}`, newData[index], {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            withCredentials: true,
                        });
                        message.success('Edit contact successfully.');
                    } catch (error) {
                        message.error('Failed to update contact');
                        console.error("Failed to update contact:", error.message);
                    }
                }

                setContacts(newData);
                setEditingKey('');

            } else {
                newData.push(row);
                setContacts(newData);
                setEditingKey('');
            }
        } catch (error) {
            console.error('Validate Failed:', error);
            message.error(error.response.data.message);
        }
    };

    const convertDate = (dateString) => {
        // Chuyển chuỗi ngày thành đối tượng Date
        const date = new Date(dateString);

        // Lấy ngày, tháng và năm
        const day = String(date.getDate()).padStart(2, '0'); // Thêm số 0 phía trước nếu ngày chỉ có 1 chữ số
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JS bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getFullYear();

        // Trả về chuỗi định dạng ngày/tháng/năm
        return `${day}/${month}/${year}`;
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            editable: true,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Phone number',
            dataIndex: 'phone_number',
            key: 'phone_number',
            editable: true,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.phone_number - b.phone_number,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            editable: true,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.address.localeCompare(b.address),
        },
        {
            title: 'Date of birth',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            editable: true,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.date_of_birth.localeCompare(b.date_of_birth),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record._id)}
                            style={{ marginInlineEnd: 8 }}
                        >
                            <CheckOutlined style={{ color: "green" }} />
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a><CloseOutlined style={{ color: "red" }} /></a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <EditOutlined />
                        </Typography.Link>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => deleteRecord(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Typography.Link disabled={editingKey !== ''}>
                                <DeleteOutlined style={{ color: "red", marginLeft: "7px" }} />
                            </Typography.Link>
                        </Popconfirm>
                    </>
                );
            },
        },

    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const addContactToTable = (newContact) => {
        newContact.date_of_birth = convertDate(newContact.date_of_birth);
        setContacts((prevContacts) => [...prevContacts, newContact]);

        // Hide add contact form
        setShowAddContactPrompt(false);
    };

    useEffect(() => {
        const controller = new AbortController();

        const fetchContacts = async () => {
            const user_id = JSON.parse(localStorage.getItem('user_data')).id;

            if (user_id) {
                try {
                    const response = await axiosPrivate.get(`/api/contacts/${user_id}`, {
                        signal: controller.signal,
                    });

                    const contacts_list = response.data;
                    contacts_list.map((item) => item.date_of_birth = convertDate(item.date_of_birth));

                    setContacts(contacts_list);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    message.error('Failed to fetch contacts.');
                    throw new Error(error.message);
                }
            }
        };

        fetchContacts();

        return () => {
            controller.abort()
        }
    }, [])

    return (
        <Form form={form} component={false}>
            <Space>
                <Button type="primary" onClick={() => setShowAddContactPrompt(true)}>
                    Add contacts
                </Button>
            </Space>
            <br /><br />
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={contacts}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                loading={loading}
                rowKey="_id"
            />

            <Modal
                open={showAddContactPrompt}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <AddContactForm addContactToTable={addContactToTable} />
            </Modal>
        </Form>
    )
}

export default ContactTable
