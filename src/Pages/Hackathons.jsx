import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchEvents } from '../utils/api'; // Import your API call
import { Link } from 'react-router-dom';

const HackathonsPageContainer = styled.div`
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

const EventGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 20px;
`;

const EventCard = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
`;
const EventCardTitle = styled.h3`
    margin-bottom: 5px;
`;

const EventList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const EventListItem = styled.li`
    margin-bottom: 5px;
    padding-left: 15px;
    text-indent: -15px;
    &:before {
        content: '•';
        display: inline-block;
        margin-right: 5px;
    }
`;

const EventButton = styled(Link)`
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
const CreateEventButton = styled.button`
    background: #28a745;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 15px;
    display: inline-block;
`;


const HackathonsPage = () => {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTheme, setFilterTheme] = useState('');
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchEvents()
                setEvents(data);
            } catch(error) {
                // handle errors
            }
        }
        loadEvents();
    }, []);

const sampleEvents = [
            {
                id: 1,
                title: "Web Development Challenge 2024",
                description: "Showcase your web development skills",
                date: "Feb 25, 2024, 10:00 AM - 6:00 PM",
                type: "Hackathon",
                theme: "Web",
            },
            {
                id: 2,
                title: "Data Science Quiz",
                description: "Test your knowledge of data science and machine learning",
                date: "March 10, 2024, 2:00 PM - 3:00 PM",
                type: "Quiz",
                theme: "Data Science",
            },
        {
            id: 3,
            title: "Mobile App Workshop",
            description: "An in person workshop to learn how to develop mobile applications",
                date: "April 20, 2024, 9:00 AM - 12:00 PM",
                type: "Workshop",
                theme: "Mobile",
            }
        ]

    const filteredEvents = sampleEvents.filter(event => {
            const searchMatch =
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase());
            const themeMatch = !filterTheme || event.theme === filterTheme;
            const typeMatch = !filterType || event.type === filterType;
            return searchMatch && themeMatch && typeMatch;
        });


    return (
        <HackathonsPageContainer>
        <CreateEventButton>Create an Event</CreateEventButton>
        <SearchAndFilterContainer>
            <SearchInput
            type="text"
            placeholder="Search events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FilterSelect
            value={filterTheme}
            onChange={(e) => setFilterTheme(e.target.value)}
            >
            <option value="">All Themes</option>
            <option value="Web">Web</option>
            <option value="Mobile">Mobile</option>
            <option value="Data Science">Data Science</option>
            </FilterSelect>
            <FilterSelect
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            >
            <option value="">All Types</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Quiz">Quiz</option>
            <option value="Workshop">Workshop</option>
        </FilterSelect>
        </SearchAndFilterContainer>

            <EventGrid>
            {filteredEvents.map((event) => (
                <EventCard key={event.id}>
                <EventCardTitle>{event.title}</EventCardTitle>
                <EventList>
                <EventListItem>Description: {event.description}</EventListItem>
                    <EventListItem>Date/Time: {event.date}</EventListItem>
                    <EventListItem>Type: {event.type}</EventListItem>
                </EventList>
                <EventButton to={`/hackathons/${event.id}`}>View Details</EventButton>
            </EventCard>
            ))}
        </EventGrid>
        </HackathonsPageContainer>
    );
};

export default HackathonsPage;