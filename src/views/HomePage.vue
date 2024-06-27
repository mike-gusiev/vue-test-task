<template>
    <div>
        <MoviesList @movie-selected="selectMovie" />
        <MovieSessions :movieId="selectedMovieId" v-if="selectedMovieId" />
        <BookTicket v-if="selectedMovieId" />
    </div>
</template>

<script>
import MoviesList from '@/components/MoviesList.vue';
import MovieSessions from '@/components/MovieSessions.vue';
import BookTicket from '@/components/BookTicket.vue';

export default {
    name: 'HomePage',
    components: {
        MoviesList,
        MovieSessions,
        BookTicket
    },
    data() {
        return {
            selectedMovieId: null
        };
    },
    methods: {
        selectMovie(movieId) {
            this.selectedMovieId = movieId;
        }
    }
};
</script>

<style scoped>
/* Add any scoped styles for Home component here */
</style>
