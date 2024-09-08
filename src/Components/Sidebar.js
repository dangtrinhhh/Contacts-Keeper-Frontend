import React from 'react';
import { WhatsAppOutlined, GlobalOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation(); // Hook to get the current route

    // Helper function to determine if the route is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className='sidebar-section'>
            <div>
                <div className={`sidebar-item ${isActive('/') ? 'sidebar-item-active' : ''}`}>
                    <Link to="/">
                        <HomeOutlined className='fs-sidebar-icon text' />
                        <h2>Home</h2>
                    </Link>
                </div>
                <div className={`sidebar-item ${isActive('/contacts') ? 'sidebar-item-active' : ''}`}>
                    <Link to="/contacts">
                        <WhatsAppOutlined className='fs-sidebar-icon text' />
                        <h2>Contacts</h2>
                    </Link>
                </div>
                <div className={`sidebar-item ${isActive('/help') ? 'sidebar-item-active' : ''}`}>
                    <Link to="/help">
                        <GlobalOutlined className='fs-sidebar-icon text' />
                        <h2>Help</h2>
                    </Link>
                </div>
            </div>
            <div>
                <div className={`sidebar-item ${isActive('/settings') ? 'sidebar-item-active' : ''}`}>
                    <Link to="/settings">
                        <SettingOutlined className='fs-sidebar-icon text' />
                        <h2>Settings</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
