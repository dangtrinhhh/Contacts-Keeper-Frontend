import React from 'react';
import './App.css'
import AddContactForm from './Components/Form/AddContactForm';
import ContactTable from './Components/Table/ContactTable'
import Navbar from './Components/Navbar';
import Settings from './Components/Settings';
import Help from './Components/Help';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Carousel from './Components/Carousel';
import Missing from './Components/Missing';
import ContactBG1 from './img/bg-1.jpg'

const App = () => (
    <Router>
        <Navbar />
        <Sidebar />
        <div style={{ height: "50px" }}></div>
        <div className='body-section'>
            <Routes>
                {/* <AddContactForm /> */}
                <Route path="/" element={<Carousel />} />
                <Route path="/contacts" element={<ContactTable />} />
                <Route path="/contacts/add" element={<AddContactForm />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />

                {/* NOT FOUND */}
                <Route path="*" element={<Missing />} />
            </Routes>
        </div>
    </Router>
);

export default App;