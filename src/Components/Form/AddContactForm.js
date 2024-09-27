import React, { useState, useEffect, memo } from 'react';
import { Button, Space, DatePicker, Input, message } from 'antd';
import { UserOutlined, MailOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch, useSelector
import { addContact } from '../../redux/contactsSlice'; // Import action addContact
import moment from 'moment';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddContactForm = ({ setShowAddContactPrompt }) => {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');

    useEffect(() => {
        console.log(birthday);
    }, [birthday]);

    const handleDateChange = (date, dateString) => {
        setBirthday(dateString);
    };

    const handleAddContacts = async () => {
        const user_id = JSON.parse(localStorage.getItem('user_data')).id;

        if (user_id) {
            const newContact = {
                user_id: user_id,
                name: name,
                email: email,
                phone_number: phoneNumber,
                address: address,
                date_of_birth: birthday
            };

            // Dispatch action addContact
            dispatch(addContact({ axiosPrivate, newContact }))
                .unwrap()
                .then(() => {
                    message.success('Add contact successfully.');
                })
                .catch((error) => {
                    message.error(`Failed to add contact: ${error.message}`);
                });
        }

        // Close contact form
        setShowAddContactPrompt(false);
    };

    return (
        <div className='input-contact-form'>
            <h2 className='mb-4'>Add contact</h2>
            <Space className='mb-4'>
                <Input
                    size="default"
                    placeholder="Name"
                    prefix={<UserOutlined />}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    size="default"
                    placeholder="Phone number"
                    prefix={<PhoneOutlined />}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </Space>
            <Space className='mb-4'>
                <Input
                    size="default"
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    size="default"
                    placeholder="Address"
                    prefix={<HomeOutlined />}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </Space>
            <Space>
                <DatePicker value={birthday ? moment(birthday) : null} onChange={handleDateChange} />
                <Button type="primary" onClick={handleAddContacts}>
                    Add contact
                </Button>
            </Space>
        </div>
    );
};

export default memo(AddContactForm);


// import React, { useState, useEffect, memo } from 'react'
// import { Button, Space, DatePicker, Input, message } from 'antd';
// import { UserOutlined, MailOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { AddContact } from '../../services/ContactsServices';
// import moment from 'moment';

// const AddContactForm = ({ addContactToTable }) => {
//     const axiosPrivate = useAxiosPrivate();
//     const [name, setName] = useState();
//     const [phoneNumber, setPhoneNumber] = useState();
//     const [email, setEmail] = useState();
//     const [address, setAddress] = useState();
//     const [birthday, setBirthday] = useState();

//     useEffect(() => {
//         console.log(birthday);
//     }, [birthday])

//     const handleDateChange = (date, dateString) => {
//         setBirthday(dateString);
//     };

//     const handleAddContacts = async () => {
//         const user_id = JSON.parse(localStorage.getItem('user_data')).id;

//         if (user_id) {
//             try {
//                 const newContact = {
//                     user_id: user_id,
//                     name: name,
//                     email: email,
//                     phone_number: phoneNumber,
//                     address: address,
//                     date_of_birth: birthday
//                 };

//                 const data = await AddContact(axiosPrivate, newContact);
//                 addContactToTable(data);
//                 message.success('Add contact successfully.');
//             } catch (error) {
//                 message.error('Failed to add contact.');
//                 throw new Error(error.message);
//             }
//         }
//     };

//     return (
//         <div className='input-contact-form'>
//             <h2 className='mb-4'>Add contact</h2>
//             <Space className='mb-4'>
//                 <Input size="smalldefault size" placeholder="Name" prefix={<UserOutlined />} value={name} onChange={(e) => setName(e.target.value)} />
//                 <Input size="smalldefault size" placeholder="Phone number" prefix={<PhoneOutlined />} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//             </Space>
//             <Space className='mb-4'>
//                 <Input size="smalldefault size" placeholder="Email" prefix={<MailOutlined />} value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <Input size="smalldefault size" placeholder="Address" prefix={<HomeOutlined />} value={address} onChange={(e) => setAddress(e.target.value)} />
//             </Space>
//             <Space>
//                 <DatePicker value={birthday ? moment(birthday) : null} onChange={handleDateChange} />
//                 <Button type="primary" onClick={handleAddContacts}>Add contact</Button>
//             </Space>
//         </div>
//     )
// }

// export default memo(AddContactForm)
