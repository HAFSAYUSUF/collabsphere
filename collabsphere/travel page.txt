import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchTravelGroups } from '../utils/api'; // Import your API function
import { Link } from 'react-router-dom';

const TravelPageContainer = styled.div`
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

const TravelGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 20px;
`;

const TravelCard = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
`;
const TravelCardTitle = styled.h3`
    margin-bottom: 5px;
`;
const TravelList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;
const TravelListItem = styled.li`
    margin-bottom: 5px;
    padding-left: 15px;
    text-indent: -15px;
    &:before {
        content: '•';
        display: inline-block;
        margin-right: 5px;
    }
`;

const TravelButton = styled(Link)`
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

const CreateTravelButton = styled.button`
    background: #28a745;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 15px;
    display: inline-block;
`;


const TravelPage = () => {
    const [travelGroups, setTravelGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDestination, setFilterDestination] = useState('');

    useEffect(() => {
        const loadTravelGroups = async () => {
            try {
                const data = await fetchTravelGroups()
            setTravelGroups(data);
            } catch (error) {
              // Handle error
            }
        };
        loadTravelGroups();
    }, []);
    const sampleTravelGroups = [
            {
                id: 1,
                title: "Backpacking through Europe",
            description: "Explore Europe on a budget, and visit all the famous cities",
            date: "June 20 - July 20, 2024",
            spaces: 3,
                destination: "Europe"
            },
            {
                id: 2,
                title: "Luxury cruise in Carribean",
                description: "Explore the Carribean on a luxury cruise and visit beautiful beaches and islands",
                date: "December 10 - December 20, 2024",
            spaces: 5,
                destination: "Carribean"
            },
        {
                id: 3,
                title: "Hiking through the Rocky Mountains",
                description: "Explore the Rocky mountains and enjoy the beauty of the mountains",
                date: "September 15 - October 1, 2024",
                spaces: 2,
                destination: "Rocky Mountains"
            }
        ]

const filteredTravelGroups = sampleTravelGroups.filter(travel => {
    const searchMatch =
        travel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        travel.description.toLowerCase().includes(searchQuery.toLowerCase());

    const destinationMatch = !filterDestination || travel.destination === filterDestination;
    return searchMatch && destinationMatch;

});
    return (
        <TravelPageContainer>
            <CreateTravelButton>Create a Travel Group</CreateTravelButton>
            <SearchAndFilterContainer>
                <SearchInput
                type="text"
                placeholder="Search Travel Groups"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FilterSelect
                value={filterDestination}
                onChange={(e) => setFilterDestination(e.target.value)}
                >
                    <option value="">All Destinations</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="South America">South America</option>
                </FilterSelect>
            </SearchAndFilterContainer>

            <TravelGrid>
                {filteredTravelGroups.map(travel => (
                <TravelCard key={travel.id}>
                    <TravelCardTitle>{travel.title}</TravelCardTitle>
                    <TravelList>
                    <TravelListItem>Description: {travel.description}</TravelListItem>
                    <TravelListItem>Date: {travel.date}</TravelListItem>
                        <TravelListItem>Spaces Available: {travel.spaces}</TravelListItem>
                    </TravelList>
                    <TravelButton to={`/travel/${travel.id}`}>View Details</TravelButton>
                </TravelCard>
                ))}
            </TravelGrid>
        </TravelPageContainer>
    );
};

export default TravelPage;