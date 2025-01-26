import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchEducationalResources } from '../utils/api';

// Styled components for layout and elements
const EducationalPageContainer = styled.div`
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


const ResourceGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 20px;
`;

const ResourceCard = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
`;
const ResourceCardTitle = styled.h3`
    margin-bottom: 5px;
`;
const ResourceCardDescription = styled.p`
    margin-bottom: 10px;
`;
const ResourceCardFormat = styled.span`
font-style: italic;
color: gray;
`;
const AddResourceButton = styled.button`
    background: #28a745;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 15px;
    display: inline-block;
`


const EducationalPage = () => {
const [resources, setResources] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [filterCategory, setFilterCategory] = useState('');
    const [filterFormat, setFilterFormat] = useState('');

useEffect(() => {
    const loadResources = async () => {
    try {
        const data = await fetchEducationalResources();
        setResources(data);
    } catch (error) {
        // Handle any errors.
        console.error("Error loading educational resources", error);
    }
    };

    loadResources();
}, []);

const filteredResources = resources.filter((resource) => {
    const searchMatch =
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = !filterCategory || resource.category === filterCategory;
    const formatMatch = !filterFormat || resource.format === filterFormat;
    return searchMatch && categoryMatch && formatMatch
});

return (
    <EducationalPageContainer>
        <h1>Educational Resources</h1>
        <p>Explore our courses, workshops and other learning material to help you grow</p>
    <AddResourceButton> Add a resource</AddResourceButton>
    <SearchAndFilterContainer>
    <SearchInput
        type="text"
        placeholder="Search resources"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
        <FilterSelect
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        >
        <option value="">All Categories</option>
        <option value="Programming">Programming</option>
        <option value="Design">Design</option>
        <option value="Business">Business</option>
        </FilterSelect>
        <FilterSelect
        value={filterFormat}
        onChange={(e) => setFilterFormat(e.target.value)}
        >
        <option value="">All Formats</option>
        <option value="Course">Course</option>
        <option value="Workshop">Workshop</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Article">Article</option>
        </FilterSelect>
</SearchAndFilterContainer>
    <ResourceGrid>
        {filteredResources.map((resource) => (
        <ResourceCard key={resource.id}>
            <ResourceCardTitle>{resource.title}</ResourceCardTitle>
            <ResourceCardDescription>{resource.description}</ResourceCardDescription>
            <ResourceCardFormat>Format: {resource.format}</ResourceCardFormat>
            </ResourceCard>
        ))}
    </ResourceGrid>
    </EducationalPageContainer>
);
};

export default EducationalPage;