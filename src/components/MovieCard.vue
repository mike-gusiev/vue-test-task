<template>
    <div class="movie-card" @click="goToDetails">
        <img :src="movie.image" alt="Movie Poster" class="movie-poster">
        <h2 v-html="movie.name"></h2>
    </div>
</template>

<script>
export default {
    name: 'MovieCard',
    props: {
        movie: {
            type: Object,
            required: true
        }
    },
    methods: {
        goToDetails() {
            this.$emit('click');
        }
    }
};
</script>

<style scoped>
.movie-card {
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
}

.movie-poster {
    max-width: 233px;
    max-height: 344px;
    border-radius: 10px;
}
</style>
