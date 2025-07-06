import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchProjects } from '../utils/api'; // Import your API call
import { Link } from 'react-router-dom';

const ProjectsPageContainer = styled.div`
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

const ProjectGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 20px;
`;

const ProjectCard = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
`;
const ProjectCardTitle = styled.h3`
    margin-bottom: 5px;
`;

const ProjectList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const ProjectListItem = styled.li`
    margin-bottom: 5px;
    padding-left: 15px;
    text-indent: -15px;
    &:before {
        content: '•';
        display: inline-block;
        margin-right: 5px;
    }
`;

const ProjectButton = styled(Link)`
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

const CreateProjectButton = styled.button`
    background: #28a745;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 15px;
    display: inline-block;
`;


const ProjectsPage = () => {
const [projects, setProjects] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [filterCategory, setFilterCategory] = useState('');
const [filterSkills, setFilterSkills] = useState('');

useEffect(() => {
    const loadProjects = async () => {
        try {
            const projects = await fetchProjects();
            setProjects(projects)
        }
        catch(error) {
              // handle errors
        }
    };
    loadProjects();
    }, []);

const sampleProjects = [
    {
        id: 1,
        title: "E-commerce Website Redesign",
        description: "A redesign of a local online store to improve user experience.",
        skills: ["React", "CSS", "JavaScript"],
        category: "Web Dev",
        teamMembers: "2/4",
    },
    {
        id: 2,
        title: "Mobile App for Travel Planning",
        description: "A mobile application to assist with travel planning.",
        skills: ["React Native", "JavaScript", "UX Design"],
        category: "Mobile",
        teamMembers: "3/5",
    },
    {
        id: 3,
        title: "Data Analysis for Local Farmers",
        description: "A project for farmers to visualize their sales data",
        skills: ["Python", "Pandas", "Data Vizualization"],
        category: "Data Science",
        teamMembers: "1/3"
    }
]


const filteredProjects = sampleProjects.filter((project) => {
    const searchMatch =
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch = !filterCategory || project.category === filterCategory;
    const skillsMatch = !filterSkills || project.skills.includes(filterSkills);
    return searchMatch && categoryMatch && skillsMatch;
});

return (
    <ProjectsPageContainer>
    <CreateProjectButton>Create a Project</CreateProjectButton>
    <SearchAndFilterContainer>
        <SearchInput
        type="text"
        placeholder="Search projects"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
        <FilterSelect
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        >
            <option value="">All Categories</option>
            <option value="Web Dev">Web Dev</option>
            <option value="Mobile">Mobile</option>
            <option value="Data Science">Data Science</option>
        </FilterSelect>
        <FilterSelect
        value={filterSkills}
        onChange={(e) => setFilterSkills(e.target.value)}
        >
            <option value="">All Skills</option>
                <option value="React">React</option>
            <option value="Python">Python</option>
            <option value="SQL">SQL</option>
            <option value="Figma">Figma</option>
        </FilterSelect>
    </SearchAndFilterContainer>

    <ProjectGrid>
        {filteredProjects.map((project) => (
            <ProjectCard key={project.id}>
            <ProjectCardTitle>{project.title}</ProjectCardTitle>
            <ProjectList>
                <ProjectListItem>Short Description: {project.description}</ProjectListItem>
                <ProjectListItem>Skills: {project.skills.join(", ")}</ProjectListItem>
                <ProjectListItem>Category: {project.category}</ProjectListItem>
                <ProjectListItem>Team Members: {project.teamMembers}</ProjectListItem>
                </ProjectList>
                <ProjectButton to={`/projects/${project.id}`}>View Details</ProjectButton>
            </ProjectCard>
        ))}
    </ProjectGrid>
    </ProjectsPageContainer>
);
};

export default ProjectsPage;