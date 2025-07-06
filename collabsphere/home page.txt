import React from 'react';
import styled from 'styled-components';
import { FaBook, FaCode, FaTrophy, FaDonate, FaPlane, FaVideo } from 'react-icons/fa';
import CategoryCard from '../components/CategoryCard';

const HomePageContainer = styled.div`
    padding: 20px;
    text-align: center;
    background-image: url('logo.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: rgba(255, 255, 255, 0.6);
    background-blend-mode: overlay;
min-height: calc(100vh - 130px);
`;

const CategoryGrid = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

const HomePage = () => {
    return (
        <HomePageContainer>
            <h1>Welcome to Collabsphere</h1>
            <p>Explore different categories and join the community!</p>
            <CategoryGrid>
                <CategoryCard title="Educational" icon={<FaBook />} link="/educational" />
                <CategoryCard title="Projects" icon={<FaCode />} link="/projects" />
                <CategoryCard title="Hackathons" icon={<FaTrophy />} link="/hackathons" />
                <CategoryCard title="Donations" icon={<FaDonate />} link="/donations" />
            <CategoryCard title="Travel" icon={<FaPlane />} link="/travel" />
                <CategoryCard title="Vlogging" icon={<FaVideo />} link="/vlogging" />
            </CategoryGrid>
        </HomePageContainer>
    );
};

export default HomePage;