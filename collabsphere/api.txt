import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Replace with your actual backend API URL
});

// Function for fetching projects
export const fetchProjects = async () => {
    try {
        const response = await api.get('/projects');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

// Function for user login
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};

// Function for fetching all events (hackathons, quizzes, etc)
export const fetchEvents = async () => {
    try {
        const response = await api.get('/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

// Function for creating a new event
export const createEvent = async (eventData) => {
    try {
        const response = await api.post('/events', eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

// Function for fetching donation causes
export const fetchDonationCauses = async () => {
    try {
        const response = await api.get('/donations');
        return response.data;
    } catch (error) {
        console.error('Error fetching donation causes:', error);
        throw error;
    }
};

// Function for handling donations
export const submitDonation = async (donationData) => {
    try {
        const response = await api.post('/donations', donationData);
        return response.data;
    } catch (error) {
        console.error('Error submitting donation:', error);
        throw error;
    }
};

// Function for fetching travel groups/plans
export const fetchTravelGroups = async () => {
    try {
        const response = await api.get('/travel');
        return response.data;
    } catch (error) {
        console.error('Error fetching travel groups:', error);
        throw error;
    }
};

// Function for creating a new travel plan/group
export const createTravelGroup = async (travelData) => {
    try {
        const response = await api.post('/travel', travelData);
        return response.data;
    } catch (error) {
        console.error('Error creating travel group:', error);
        throw error;
    }
};

// Function for fetching vlogs
export const fetchVlogs = async () => {
    try {
        const response = await api.get('/vlogs');
        return response.data;
    } catch (error) {
        console.error('Error fetching vlogs:', error);
        throw error;
    }
};

// Function for uploading a new vlog
export const uploadVlog = async (vlogData) => {
    try {
        const response = await api.post('/vlogs', vlogData);
        return response.data;
    } catch (error) {
        console.error('Error uploading vlog:', error);
        throw error;
    }
};

//Function for creating new donation cause
export const createDonationCause = async (causeData) => {
    try {
        const response = await api.post('/donations', causeData);
        return response.data;
    } catch (error) {
        console.error("Error creating new cause:", error);
        throw error;
    }
};


// Function for fetching educational content
export const fetchEducationalContent = async () => {
try {
    const response = await api.get('/education');
    return response.data;
} catch (error) {
    console.error('Error fetching educational content:', error);
    throw error;
}
};


// Function for creating new educational content
export const createEducationalContent = async (contentData) => {
    try {
        const response = await api.post('/education', contentData);
        return response.data;
    } catch (error) {
        console.error("Error creating new educational content", error);
        throw error;
    }
}



export default api;