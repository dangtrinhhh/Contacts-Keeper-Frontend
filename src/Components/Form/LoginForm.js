import React, { useState, useEffect } from 'react'
import { Input, Button, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { AuthProvider, AuthContext } from '../../Context/AuthProvider';

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { auth, setAuth } = useAuth();
    console.log("🚀 ~ LoginForm auth state:", auth);

    useEffect(() => {
        console.log("🚀 ~ auth:", auth)
    }, [auth])

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `/api/users/login`,
                {
                    email: email,
                    password: password,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log("🚀 ~ response:", response.cookies)

            // Handle login success
            if (response.data) {
                message.success('Login successful!');
                console.log('Login response:', response.data);
                const userData = response.data;
                console.log("🚀 ~ Setting auth with userData:", userData);
                
                setAuth(userData);

                // // Save access token and user data to localStorage
                // localStorage.setItem('access_token', response.data.accessToken);

                // localStorage.setItem('user_data', JSON.stringify(response.data.user));

                onLoginSuccess(response.data.user);
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthProvider>
            <div>
                <h3 className='mb-4'>
                    Log in
                </h3>
                <div className='mb-4'>
                    <Input
                        size="smalldefault size"
                        placeholder="Username or Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        prefix={<UserOutlined />}
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
                <Button
                    type="primary"
                    onClick={handleLogin}
                    loading={loading}
                    style={{ width: '100%' }}
                >
                    Login
                </Button>
            </div>
        </AuthProvider>
    )
}

export default LoginForm
