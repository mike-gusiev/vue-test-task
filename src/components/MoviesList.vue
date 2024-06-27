<template>
    <div class="movies-container">
        <form @submit.prevent="searchMovies" class="search-form">
            <label for="movieName">Movie Name:</label>
            <input type="text" id="movieName" v-model="searchParams.name" class="form-input">

            <label for="genres">Genres:</label>
            <select id="genres" v-model="searchParams.genres" class="form-input">
                <option value="">All Genres</option>
                <option value="0">Action</option>
                <option value="1">Adventures</option>
                <option value="2">Comedy</option>
                <option value="3">Drama</option>
                <option value="4">Horror</option>
                <option value="5">Westerns</option>
            </select>

            <button type="submit" class="form-button">Search</button>
        </form>

        <ul class="movies-list">
            <MovieCard
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
                @click="selectMovie(movie.id)"
            />
        </ul>
    </div>
</template>

<script>
import { fetchMovies } from '@/services/cinema-api';
import MovieCard from './MovieCard.vue';

export default {
    components: { MovieCard },
    data() {
        return {
            movies: [],
            searchParams: {
                name: '',
                genres: ''
            }
        };
    },
    async mounted() {
        await this.searchMovies();
    },
    methods: {
        async searchMovies() {
            try {
                const response = await fetchMovies(this.searchParams);
                this.movies = response.data;
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        },
        selectMovie(movieId) {
            this.$router.push({ name: 'MovieDetails', params: { id: movieId } });
        }
    }
};
</script>

<style scoped>
.movies-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
}

.search-form {
    margin-bottom: 20px;
}

.form-input {
    margin-right: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.form-button:hover {
    background-color: #0056b3;
}

.movies-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
