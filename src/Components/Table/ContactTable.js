import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography, Space, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import AddContactForm from '../Form/AddContactForm';
import { fetchContacts, updateContact, deleteContact } from '../../redux/contactsSlice';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const EditableCell = ({ editing, dataIndex, title, inputType, record, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[{ required: true, message: `Please Input ${title}!` }]}
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
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [showAddContactPrompt, setShowAddContactPrompt] = useState(false);
    // Get contacts, filtered contacts, loading from redux store
    const { contacts, filteredContacts, loading } = useSelector((state) => state.contacts);

    const isEditing = (record) => record._id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record._id);
    };

    const cancel = () => setEditingKey('');

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const { _id } = contacts.find((item) => key === item._id);
            if (_id) {
                dispatch(updateContact({ axiosPrivate, id: _id, updatedContact: row }));
                message.success('Edit contact successfully.');
                setEditingKey('');
            }
        } catch (error) {
            message.error('Failed to update contact.');
        }
    };

    const deleteRecord = (record) => {
        const { _id } = record;
        if (_id) {
            dispatch(deleteContact({ axiosPrivate, id: _id }));
            message.success('Delete contact successfully.');
        }
    };

    const convertDate = (dateString) => {
        const date = new Date(dateString);

        // Get day, month, year
        const day = String(date.getDate()).padStart(2, '0'); // Add 0 in front of day if it contain 1 digit
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month in JS start from 0 to 11 => add 1
        const year = date.getFullYear();

        // Return string day/month/year
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
            render: (date_of_birth) => convertDate(date_of_birth),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record._id)} style={{ marginInlineEnd: 8 }}>
                            <CheckOutlined style={{ color: 'green' }} />
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <p><CloseOutlined style={{ color: 'red' }} /></p>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <EditOutlined />
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteRecord(record)}>
                            <Typography.Link disabled={editingKey !== ''}>
                                <DeleteOutlined style={{ color: 'red', marginLeft: '7px' }} />
                            </Typography.Link>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(fetchContacts(axiosPrivate));
    }, [dispatch, axiosPrivate]);

    return (
        <Form form={form} component={false}>
            <Space>
                <Button type="primary" onClick={() => setShowAddContactPrompt(true)}>Add contacts</Button>
            </Space>
            <br /><br />
            <Table
                components={{ body: { cell: EditableCell } }}
                bordered
                dataSource={filteredContacts.length > 0 ? filteredContacts : contacts} // Use filteredContacts if exist
                columns={columns}
                rowClassName="editable-row"
                pagination={{ onChange: cancel }}
                loading={loading}
                rowKey="_id"
            />
            <Modal
                open={showAddContactPrompt}
                centered
                onOk={() => setShowAddContactPrompt(false)}
                onCancel={() => setShowAddContactPrompt(false)}
                footer={null}
            >
                <AddContactForm setShowAddContactPrompt={setShowAddContactPrompt} />
            </Modal>
        </Form>
    );
};

export default ContactTable;

// import React, { useEffect, useState } from 'react';
// import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography, Space, Modal, message } from 'antd';
// import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
// import AddContactForm from '../Form/AddContactForm';
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { FetchContacts, UpdateContact, DeleteContact } from '../../services/ContactsServices';

// const EditableCell = ({
//     editing,
//     dataIndex,
//     title,
//     inputType,
//     record,
//     index,
//     children,
//     ...restProps
// }) => {
//     const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
//     return (
//         <td {...restProps}>
//             {editing ? (
//                 <Form.Item
//                     name={dataIndex}
//                     style={{
//                         margin: 0,
//                     }}
//                     rules={[
//                         {
//                             required: true,
//                             message: `Please Input ${title}!`,
//                         },
//                     ]}
//                 >
//                     {inputNode}
//                 </Form.Item>
//             ) : (
//                 children
//             )}
//         </td>
//     );
// };

// const ContactTable = () => {
//     const axiosPrivate = useAxiosPrivate();
//     const [contacts, setContacts] = useState([]);
//     const [showAddContactPrompt, setShowAddContactPrompt] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [form] = Form.useForm();
//     const [editingKey, setEditingKey] = useState('');
//     const isEditing = (record) => record._id === editingKey;

//     const edit = (record) => {
//         form.setFieldsValue({
//             ...record,
//         });
//         setEditingKey(record._id);
//     };

//     const deleteRecord = async (record) => {
//         const { _id } = record;

//         // Delete Contact API
//         if (_id) {
//             try {
//                 DeleteContact(axiosPrivate, _id);
//                 message.success('Delete contact successfully.');
//             } catch (error) {
//                 message.error('Failed to delete contact.');
//             }
//         }

//         const newContacts = contacts.filter((item) => item._id !== record._id);
//         setContacts(newContacts);
//     };

//     const handleOk = () => {
//         setShowAddContactPrompt(false);
//     };

//     const handleCancel = () => {
//         setShowAddContactPrompt(false);
//     };

//     const cancel = () => {
//         setEditingKey('');
//     };

//     // Save edited record
//     const save = async (key) => {
//         try {
//             const row = await form.validateFields();
//             const newData = [...contacts];
//             const index = newData.findIndex((item) => key === item._id);
//             if (index > -1) {
//                 const item = newData[index];
//                 newData.splice(index, 1, {
//                     ...item,
//                     ...row,
//                 });

//                 const { _id } = newData[index];

//                 // Update Contact API
//                 if (_id) {
//                     try {
//                         UpdateContact(axiosPrivate, _id, newData[index]);
//                         message.success('Edit contact successfully.');
//                     } catch (error) {
//                         message.error('Failed to update contact');
//                         console.error("Failed to update contact:", error.message);
//                     }
//                 }

//                 setContacts(newData);
//                 setEditingKey('');
//             } else {
//                 newData.push(row);
//                 setContacts(newData);
//                 setEditingKey('');
//             }
//         } catch (error) {
//             console.error('Validate Failed:', error);
//             message.error(error.response.data.message);
//         }
//     };

//     const convertDate = (dateString) => {
//         const date = new Date(dateString);

//         // Get dat, month, year
//         const day = String(date.getDate()).padStart(2, '0'); // Add 0 in front of day if it contain 1 digit
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // Month in JS start from 0 to 11 => add 1
//         const year = date.getFullYear();

//         // Return string day/month/year
//         return `${day}/${month}/${year}`;
//     }

//     const columns = [
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             key: 'name',
//             editable: true,
//             defaultSortOrder: 'ascend',
//             sorter: (a, b) => a.name.localeCompare(b.name),
//         },
//         {
//             title: 'Email',
//             dataIndex: 'email',
//             key: 'email',
//             editable: true,
//             defaultSortOrder: 'ascend',
//             sorter: (a, b) => a.email.localeCompare(b.email),
//         },
//         {
//             title: 'Phone number',
//             dataIndex: 'phone_number',
//             key: 'phone_number',
//             editable: true,
//             defaultSortOrder: 'ascend',
//             sorter: (a, b) => a.phone_number - b.phone_number,
//         },
//         {
//             title: 'Address',
//             dataIndex: 'address',
//             key: 'address',
//             editable: true,
//             defaultSortOrder: 'ascend',
//             sorter: (a, b) => a.address.localeCompare(b.address),
//         },
//         {
//             title: 'Date of birth',
//             dataIndex: 'date_of_birth',
//             key: 'date_of_birth',
//             editable: true,
//             defaultSortOrder: 'ascend',
//             sorter: (a, b) => a.date_of_birth.localeCompare(b.date_of_birth),
//         },
//         {
//             title: 'Actions',
//             dataIndex: 'actions',
//             render: (_, record) => {
//                 const editable = isEditing(record);
//                 return editable ? (
//                     <span>
//                         <Typography.Link
//                             onClick={() => save(record._id)}
//                             style={{ marginInlineEnd: 8 }}
//                         >
//                             <CheckOutlined style={{ color: "green" }} />
//                         </Typography.Link>
//                         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//                             <p><CloseOutlined style={{ color: "red" }} /></p>
//                         </Popconfirm>
//                     </span>
//                 ) : (
//                     <>
//                         <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//                             <EditOutlined />
//                         </Typography.Link>
//                         <Popconfirm
//                             title="Sure to delete?"
//                             onConfirm={() => deleteRecord(record)}
//                             okText="Yes"
//                             cancelText="No"
//                         >
//                             <Typography.Link disabled={editingKey !== ''}>
//                                 <DeleteOutlined style={{ color: "red", marginLeft: "7px" }} />
//                             </Typography.Link>
//                         </Popconfirm>
//                     </>
//                 );
//             },
//         },

//     ];

//     const mergedColumns = columns.map((col) => {
//         if (!col.editable) {
//             return col;
//         }
//         return {
//             ...col,
//             onCell: (record) => ({
//                 record,
//                 inputType: col.dataIndex === 'age' ? 'number' : 'text',
//                 dataIndex: col.dataIndex,
//                 title: col.title,
//                 editing: isEditing(record),
//             }),
//         };
//     });

//     const addContactToTable = (newContact) => {
//         if (newContact.date_of_birth) {
//             newContact.date_of_birth = convertDate(newContact.date_of_birth);
//             setContacts((prevContacts) => [...prevContacts, newContact]);
//         }
//         // Hide add contact form
//         setShowAddContactPrompt(false);
//     };

//     useEffect(() => {
//         const controller = new AbortController();

//         const fetchContacts = async () => {
//             const user_id = JSON.parse(localStorage.getItem('user_data')).id;

//             if (user_id) {
//                 try {
//                     // Fetch Contacts
//                     const contacts_list = await FetchContacts(axiosPrivate, user_id);
//                     contacts_list.map((item) => item.date_of_birth = convertDate(item.date_of_birth));

//                     setContacts(contacts_list);
//                     setLoading(false);
//                 } catch (error) {
//                     setLoading(false);
//                     message.error('Failed to fetch contacts.');
//                     throw new Error(error.message);
//                 }
//             }
//         };

//         fetchContacts();

//         return () => {
//             controller.abort()
//         }
//     }, [axiosPrivate])

//     return (
//         <Form form={form} component={false}>
//             <Space>
//                 <Button type="primary" onClick={() => setShowAddContactPrompt(true)}>
//                     Add contacts
//                 </Button>
//             </Space>
//             <br /><br />
//             <Table
//                 components={{
//                     body: {
//                         cell: EditableCell,
//                     },
//                 }}
//                 bordered
//                 dataSource={contacts}
//                 columns={mergedColumns}
//                 rowClassName="editable-row"
//                 pagination={{
//                     onChange: cancel,
//                 }}
//                 loading={loading}
//                 rowKey="_id"
//             />

//             <Modal
//                 open={showAddContactPrompt}
//                 centered
//                 onOk={handleOk}
//                 onCancel={handleCancel}
//                 footer={null}
//             >
//                 <AddContactForm addContactToTable={addContactToTable} />
//             </Modal>
//         </Form>
//     )
// }

// export default ContactTable
