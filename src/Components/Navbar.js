import React, { useState, useLayoutEffect } from 'react';
import { Input, Modal, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import logoImage from '../img/logo.png'
import LoginForm from './Form/LoginForm';
import SignupForm from './Form/SignupForm';
import UserAvatarDefault from '../img/phone-logo.jpg'
import axios from '../api/axios';

const { Search } = Input;

export const handleLogout = async () => {
    try {
        await axios.post('/api/users/logout', {}, {
            withCredentials: true,
        });

        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('auth');

        window.location.href = '/'; 
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

const Navbar = () => {
    const onSearch = (value, _e, info) => console.log(value);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    useLayoutEffect(() => {
        // Check if user login
        const userData = localStorage.getItem('user_data');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const showLoginForm = () => {
        setIsLoginModalOpen(true);
    };

    const showSignupForm = () => {
        setIsSignupModalOpen(true);
    };

    const handleOk = () => {
        setIsLoginModalOpen(false);
        setIsSignupModalOpen(false);
    };

    const handleCancel = () => {
        setIsLoginModalOpen(false);
        setIsSignupModalOpen(false);
    };

    const onLoginSuccess = (userData) => {
        setUser(userData);
        setIsLoginModalOpen(false);
    };

    const onSignupSuccess = (userData) => {
        setIsSignupModalOpen(false);
    };

    return (
        <div className='align-center-header'>
            <h1 className='header-title'>
                <Link to="/">
                    <img src={logoImage} className='header-logo' alt='Contacts Keeper'></img>
                </Link>
                <Link to="/" className='ml-4'>
                    Contacts Keeper
                </Link>
            </h1>
            <div
                style={{ width: "500px" }}
            >
                <Search
                    placeholder="Input contact name to search"
                    allowClear
                    enterButton
                    size="large"
                    onSearch={onSearch}
                />
            </div>
            <div>
                {user ? (
                    // Show avatar and Log out button if user logged in
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={UserAvatarDefault} alt={user.name} />
                        <span className='ml-2'>{user.name}</span>
                        <Button type="link" onClick={handleLogout} className='ml-2'>
                            Log out
                        </Button>
                    </div>
                ) : (
                    // Show login and signup button if user not logged in
                    <>
                        <span onClick={showLoginForm}>
                            <p className='navbar-item' >
                                Log in
                            </p>
                        </span>
                        <Modal
                            title="Welcome to Contacts Keeper !"
                            centered
                            open={isLoginModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            <LoginForm onLoginSuccess={onLoginSuccess} />
                        </Modal>

                        <span className='ml-4' onClick={showSignupForm}>
                            <p className='navbar-item'>
                                Sign up
                            </p>
                        </span>
                        <Modal
                            title="Welcome to Contacts Keeper !"
                            centered
                            open={isSignupModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            <SignupForm onSignupSuccess={onSignupSuccess} />
                        </Modal>
                    </>
                )}
            </div>
        </div >
    );
}

export default Navbar;
