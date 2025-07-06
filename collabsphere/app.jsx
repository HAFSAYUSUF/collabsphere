import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/Homepage';
import ProjectsPage from './Pages/ProjectsPage';
import HackathonsPage from './Pages/Hackathons';
import DonationsPage from './Pages/DonationsPage';
import TravelPage from './Pages/TravelPage';
import VloggingPage from './Pages/VloggingPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import UserProfile from './pages/UserProfile';
import NotFoundPage from './pages/NotFoundPage';
import Footer from "./components/Footer";

import GlobalStyles from "./styles/GlobalStyles.jsx";



const App = () => {
    return (
        <Router>
            <GlobalStyles />
            <Navbar />
            <Routes>
                
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                <Route path="/hackathons" element={<HackathonsPage />} />
                <Route path="/hackathons/:id" element={<EventDetailsPage />} />
                <Route path="/donations" element={<DonationsPage />} />
                <Route path="/travel" element={<TravelPage />} />
                <Route path="/vlogging" element={<VloggingPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;