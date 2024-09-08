import React, { useState, useEffect } from 'react'
import { Input, Button, message } from 'antd';
import { UserOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons';
import axios from '../../api/axios';

const SignupForm = ({ onSignupSuccess }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/users/register`, {
                username: username,
                email: email,
                password: password,
            });

            // Handle signup success
            if (response.data) {
                onSignupSuccess(response.data.user);
                message.success('Signup successful!');
            }
        } catch (error) {
            console.error('Signup error:', error);
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className='mb-4'>
                Sign up
            </h3>
            <div className='mb-4'>
                <Input
                    size="smalldefault size"
                    placeholder="Username"
                    prefix={<UserOutlined />}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='mb-4'>
                <Input
                    size="smalldefault size"
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className='mb-4'>
                <Input.Password
                    placeholder="Password"
                    prefix={<KeyOutlined />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='mb-4'>
                <Input.Password
                    placeholder="Confirm Password"
                    prefix={<KeyOutlined />}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <Button
                type="primary"
                onClick={handleSignup}
                loading={loading}
                style={{ width: '100%' }}
            >
                Signup
            </Button>
        </div>
    )
}

export default SignupForm
