<template>
    <div class="movie-details" v-if="movie">
        <div class="header-group">
            <h1 class="movie-name">{{ movie.name }}</h1>
            <div class="second-block">
                <img :src="movie.image" alt="Movie Poster" class="movie-poster">
                <movie-sessions :movie-id="movie.id"/>
            </div>
        </div>
        <div class="additional-info" v-html="movie.additional"></div>
        <div class="description-group">
            <h2 class="description-title">Description:</h2>
            <p class="description" v-html="movie.description"></p>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import {fetchMovies} from '@/services/cinema-api';
import MovieSessions from "@/components/MovieSessions";

export default {
    components: {
        MovieSessions,
    },
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

.header-group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.movie-name {
    text-align: center;
    margin-bottom: 20px;
}

.second-block {
    display: flex;
}

.movie-poster {
    width: fit-content;
    max-width: 233px;
    max-height: 344px;
    border-radius: 8px;
}

.additional-info {
    margin: 20px 0;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.description-group {
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.description-title {
    margin-bottom: 10px;
}

.description {

    line-height: 1.6;
    color: #333;
}

@media (max-width: 500px) {
    .second-block {
        flex-direction: column;
        align-items: center;
    }
}
</style>
