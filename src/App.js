import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from './Registro';
import Login from './Login';
import UserProfile from './UserProfile';
import HomePage from './HomePage';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/registro" element={<Registro />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/home" element={<HomePage />} />

                    <Route path="/" element={<Login />} />

                    <Route path="/user/:userId" element={<UserProfile />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
