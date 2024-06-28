import axios from 'axios';

const API_BASE_URL = 'https://cinema-api-test.y-media.io/v1';

export async function fetchMovies(params = {}) {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export async function fetchMovieSessions(movieId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/movieShows?movie_id=${movieId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie sessions:', error);
        throw error;
    }
}

export async function fetchShowPlaces(movieId, showDate, daytime) {
    try {
        const response = await axios.get(`${API_BASE_URL}/showPlaces`, {
            params: { movie_id: movieId, showdate: showDate, daytime: daytime }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching show places:', error);
        throw error;
    }
}

export async function bookPlace(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/bookPlace`, data);
        return response.data;
    } catch (error) {
        console.error('Error booking place:', error);
        throw error;
    }
}
