<template>
    <div class="movie-details" v-if="movie">
        <h1>{{ movie.name }}</h1>
        <img :src="movie.image" alt="Movie Poster" class="movie-poster">
        <div class="additional-info" v-html="movie.additional"></div>
        <h2>Description:</h2>
        <p class="description" v-html="movie.description"></p>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import { fetchMovies } from '@/services/cinema-api';

export default {
    data() {
        return {
            movie: null
        };
    },
    async created() {
        try {
            const movieId = this.$route.params.id;
            const response = await fetchMovies({ movie_id: movieId });
            this.movie = response.data[0];
            console.log(this.movie.description)
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }
};
</script>

<style scoped>
.movie-details {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.movie-poster {
    width: fit-content;
    max-width: 240px;
    border-radius: 8px;
}

.additional-info {
    margin: 20px 0;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.description {
    line-height: 1.6;
    color: #333;
}
</style>
