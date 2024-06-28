<template>
    <div>
        <MoviesList @movie-selected="selectMovie" />
    </div>
</template>

<script>
import MoviesList from '@/components/MoviesList.vue';

export default {
    name: 'HomePage',
    components: {
        MoviesList
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

</style>
