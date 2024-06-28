<template>
    <div class="movies-container">
        <form @submit.prevent="searchMovies" class="search-form">
            <div class="form-first-block">
                <label for="movieName">Movie Name:</label>
                <input type="text" id="movieName" v-model="searchParams.name" class="form-input">
            </div>

            <div class="form-second-block">
                <div>
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
                </div>

                <button type="submit" class="form-button">Search</button>
            </div>
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
    margin: 20px;
}

.search-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
}

.form-input {
    max-width: 178px;
    margin-left: 6px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-first-block {
    display: flex;
    align-items: center;
}

.form-second-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form-button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
}

.form-button:hover {
    background-color: #0056b3;
}

.movies-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

@media (min-width: 720px) {
    .search-form {
        flex-direction: row;
        gap: 16px;
    }

    .form-button {
        margin-left: 32px;
    }

    .movies-list {
        justify-content: space-around;
    }
}
</style>
