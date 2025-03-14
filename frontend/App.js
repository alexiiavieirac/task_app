import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDatails';
import Ranking from './components/Ranking';
import './index.css';

function App() {
    return (
        <Router>
            <div className='min-h-screen bg-gray-100'>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/tasks/:taskId" element={<TaskDetails />} />

                    <Route path="/racking" element={<Ranking />} />

                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;