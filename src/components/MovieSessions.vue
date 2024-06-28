<template>
    <div class="movie-sessions">
        <h2>Movie Sessions</h2>
        <h4>Select Date:</h4>
        <select id="sessionDate" v-model="selectedDate" class="session-select">
            <option v-for="session in sessions" :key="session.showdate" :value="session.showdate">{{ session.showdate }}</option>
        </select>
        <div v-if="selectedDate">
            <ul class="session-list">
                <li v-for="time in getSessionTimes(selectedDate)" :key="time" class="session-item">
                    {{ time }}
                    <button @click="openBookingPopup(selectedDate, time)">Book Ticket</button>
                </li>
            </ul>
        </div>
        <p v-else>No sessions available for selected date</p>
    </div>
    <book-ticket
        v-if="isPopupVisible"
        :movie-id="movieId"
        :show-date="selectedDate"
        :time="selectedTime"
        @close="isPopupVisible = false"
    />
</template>

<script>
import { fetchMovieSessions } from '@/services/cinema-api';
import BookTicket from './BookTicket.vue';

export default {
    name: 'MovieSessions',
    components: {
        BookTicket
    },
    props: {
        movieId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            sessions: [],
            selectedDate: '',
            isPopupVisible: false,
            selectedTime: ''
        };
    },
    async mounted() {
        await this.fetchSessions();
    },
    methods: {
        async fetchSessions() {
            try {
                const response = await fetchMovieSessions(this.movieId);
                this.sessions = response.data[this.movieId];
                if (this.sessions.length) {
                    this.selectedDate = this.sessions[0].showdate;
                }
            } catch (error) {
                console.error('Error fetching movie sessions:', error);
            }
        },
        getSessionTimes(showdate) {
            const session = this.sessions.find(s => s.showdate === showdate);
            return session ? session.daytime.split(';') : [];
        },
        openBookingPopup(showDate, time) {
            this.selectedTime = time;
            this.isPopupVisible = true;
        }
    }
};
</script>

<style scoped>
.movie-sessions {
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 10px;
    margin-left: 20px;
}

.session-select {
    padding: 8px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    color: #333;
    width: 100%;
    max-width: 300px;
    box-sizing: border-box;
}
.session-select:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
.session-select option {
    padding: 10px;
    background-color: #f0f0f0;
    color: #333;
}

.session-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.session-item {
    width: fit-content;
    margin-bottom: 10px;
    padding: 6px;
    display: flex;
    align-items: center;
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
    user-select: none;
}
.session-item button:hover {
    background-color: #0056b3;
}

@media (max-width: 500px) {
    .movie-sessions {
        margin: 20px 0 0 0;
    }
}
</style>
