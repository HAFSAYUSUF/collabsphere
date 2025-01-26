import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchDonationCauses, submitDonation } from '../utils/api'; // Import your API functions
import {Link} from "react-router-dom";

const DonationsPageContainer = styled.div`
padding: 20px;
`;

const SearchAndFilterContainer = styled.div`
display: flex;
gap: 10px;
align-items: center;
margin-bottom: 20px;
`;

const SearchInput = styled.input`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const FilterSelect = styled.select`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const DonationGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 20px;
`;

const DonationCard = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
`;
const DonationCardTitle = styled.h3`
    margin-bottom: 5px;
`;

const DonationList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const DonationListItem = styled.li`
    margin-bottom: 5px;
    padding-left: 15px;
    text-indent: -15px;
    &:before {
        content: '•';
    display: inline-block;
        margin-right: 5px;
    }
`;

const ProgressContainer = styled.div`
background-color: #e0e0e0;
border-radius: 4px;
height: 10px;
margin-bottom: 10px;
`;

const ProgressBar = styled.div`
background-color: #4caf50;
height: 100%;
border-radius: 4px;
width: ${({ progress }) => progress}%;
`;

const DonationCardDetails = styled.div`
    margin-bottom: 10px;
`
const DonationButton = styled(Link)`
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

const CreateDonationCauseButton = styled.button`
    background: #28a745;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 15px;
    display: inline-block;
`;


const DonationsPage = () => {
    const [causes, setCauses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterLocation, setFilterLocation] = useState('');

    useEffect(() => {
        const loadDonationCauses = async () => {
        try {
                const data = await fetchDonationCauses();
            setCauses(data);
            } catch (error) {
                // Handle errors
            }
    };
        loadDonationCauses();
    }, []);
    const handleDonation = async (causeId, amount) => {
    try {
        const data = await submitDonation({causeId, amount});
             // Handle success and do something such as displaying a confirmation message
    } catch (error) {
           // Handle error
    }
    }

    const sampleCauses = [
            {
                id: 1,
                title: "Donate Blood",
                description: "Help provide learning resources for children.",
                category: "Health",
                location: "Local",
                raised: 6000,
                goal: 10000,
            },
            {
            id: 2,
                title: "Support for Community Center",
                description: "Help support funding for local community center",
                category: "Education",
                location: "National",
                raised: 8000,
                goal: 10000,
            },
            {
                id: 3,
                title: "Disaster Relief for Victims",
                description: "Provide help to those affected by recent floods.",
                category: "Disaster Relief",
                location: "International",
                raised: 4000,
                goal: 10000,
            },
        ]
    const filteredCauses = sampleCauses.filter((cause) => {
        const searchMatch =
        cause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cause.description.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = !filterCategory || cause.category === filterCategory;
        const locationMatch = !filterLocation || cause.location === filterLocation;

    return searchMatch && categoryMatch && locationMatch;
    });


    return (
        <DonationsPageContainer>
        <CreateDonationCauseButton>Add a New Cause</CreateDonationCauseButton>
            <SearchAndFilterContainer>
            <SearchInput
                type="text"
                placeholder="Search causes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FilterSelect
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            >
            <option value="">All Categories</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Environment">Environment</option>
            <option value="Disaster Relief">Disaster Relief</option>
        </FilterSelect>
        <FilterSelect
        value={filterLocation}
        onChange={(e) => setFilterLocation(e.target.value)}
        >
            <option value="">All Locations</option>
            <option value="Local">Local</option>
                <option value="National">National</option>
                <option value="International">International</option>
        </FilterSelect>
            </SearchAndFilterContainer>

            <DonationGrid>
                {filteredCauses.map((cause) => (
                <DonationCard key={cause.id}>
                <DonationCardTitle>{cause.title}</DonationCardTitle>
                    <DonationList>
                        <DonationListItem>Short Description: {cause.description}</DonationListItem>
                    </DonationList>
                    <DonationCardDetails>
                        <span>{cause.category}</span>, <span>{cause.location}</span>
                    </DonationCardDetails>
                        <ProgressContainer>
                        <ProgressBar progress={(cause.raised/cause.goal) * 100 }/>
                    </ProgressContainer>
                    <p>Raised ${cause.raised} / ${cause.goal}</p>
                        <DonationButton onClick={() => handleDonation(cause.id, 10)} >Donate </DonationButton>
                </DonationCard>
                ))}
            </DonationGrid>
        </DonationsPageContainer>
    );
};

export default DonationsPage;