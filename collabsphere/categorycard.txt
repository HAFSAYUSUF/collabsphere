import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Card = styled.div`
    border: 1px solid #ddd;
    padding: 20px;
    margin: 10px;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CardIcon = styled.div`
    font-size: 40px;
    margin-bottom: 10px;
`;

const CardTitle = styled.h3`
    margin-bottom: 5px;
`;
const CardButton = styled(Link)`
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    margin-top: 10px;

    &:hover {
        background: #0056b3;
    }
`
const CategoryCard = ({ title, icon, link }) => {
    return (
        <Card>
        <CardIcon>{icon}</CardIcon>
        <CardTitle>{title}</CardTitle>
        <CardButton to={link}>Explore</CardButton>
        </Card>
    );
};

export default CategoryCard;