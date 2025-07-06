import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchVlogs } from '../utils/api'; // Replace with your API call
import { Link } from 'react-router-dom'

const VloggingPageContainer = styled.div`
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

const VideoGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 20px;
`;

const VideoCard = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
`;

const VideoThumbnail = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
`;
const VideoCardTitle = styled.h3`
    margin-bottom: 5px;
`;
const VideoCardDescription = styled.p`
    margin-bottom: 10px;
`;
const VideoCardDetails = styled.div`
margin-bottom: 10px;
`


const VideoButton = styled(Link)`
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

const UploadVideoButton = styled.button`
    background: #28a745;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 15px;
    display: inline-block;
`;

const VloggingPage = () => {
    const [vlogs, setVlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        const loadVlogs = async () => {
        try {
                const data = await fetchVlogs();
                setVlogs(data);
            } catch(error) {
                // Handle error
            }
    };
        loadVlogs();
    }, []);

    const filteredVlogs = vlogs.filter((vlog) => {
        const searchMatch =
        vlog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vlog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = !filterCategory || vlog.category === filterCategory;

    return searchMatch && categoryMatch;
});

    return (
        <VloggingPageContainer>
            <UploadVideoButton>Upload a Vlog</UploadVideoButton>
            <SearchAndFilterContainer>
                <SearchInput
                type="text"
                placeholder="Search Vlogs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FilterSelect
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Travel">Travel</option>
                    <option value="Project">Project</option>
                    <option value="Tutorial">Tutorial</option>
            </FilterSelect>
            </SearchAndFilterContainer>

            <VideoGrid>
                {filteredVlogs.map((vlog) => (
                <VideoCard key={vlog.id}>
                    <VideoThumbnail src={vlog.thumbnail} alt={vlog.title} />
                    <VideoCardTitle>{vlog.title}</VideoCardTitle>
                <VideoCardDescription>{vlog.description}</VideoCardDescription>
                <VideoButton to={`/vlogging/${vlog.id}`}>Watch</VideoButton>
                </VideoCard>
                ))}
            </VideoGrid>
        </VloggingPageContainer>
    );
};

export default VloggingPage;