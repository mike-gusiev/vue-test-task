<template>
    <div class="movie-sessions">
        <h2>Movie Sessions</h2>
        <label for="sessionDate">Select Date:</label>
        <select id="sessionDate" v-model="selectedDate">
            <option v-for="session in sessions" :key="session.showdate" :value="session.showdate">{{ session.showdate }}</option>
        </select>
        <div v-if="selectedDate">
            <ul>
                <li v-for="session in sessions.find(s => s.showdate === selectedDate).daytime" :key="session" class="session-item">
                    {{ session }}
                    <button @click="bookTicket(selectedDate, session)">Book Ticket</button>
                </li>
            </ul>
        </div>
        <p v-else>No sessions available for selected date</p>
    </div>
</template>

<script>
import { fetchMovieSessions } from '@/services/cinema-api';

export default {
    name: 'MovieSessions',
    props: {
        movieId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            sessions: [],
            selectedDate: ''
        };
    },
    async mounted() {
        await this.fetchSessions();
    },
    methods: {
        async fetchSessions() {
            try {
                const response = await fetchMovieSessions(this.movieId);
                this.sessions = response;
                if (this.sessions.length) {
                    this.selectedDate = this.sessions[0].showdate;
                }
            } catch (error) {
                console.error('Error fetching movie sessions:', error);
            }
        },
        async bookTicket(showDate, time) {
            console.log('Booking ticket for:', showDate, time);
        }
    }
};
</script>

<style scoped>
.movie-sessions {
    margin: 20px;
}
.session-item {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.session-item button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.session-item button:hover {
    background-color: #0056b3;
}
</style>
