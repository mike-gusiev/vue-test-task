<template>
    <div class="popup-overlay" @click.self="close">
        <div class="popup-content">
            <h2>Select Seats</h2>
            <div v-if="showPlaces.length > 0">
                <div v-for="(row, index) in showPlaces" :key="index" class="row">
                    <span>Row {{ row[0].row }}</span>
                    <div class="seats">
                        <span
                            v-for="seat in row[1]"
                            :key="seat.seat"
                            class="seat"
                            :class="{
                                free: seat.is_free && !isSeatBooked(row[0].row, seat.seat),
                                occupied: !seat.is_free,
                                booked: isSeatBooked(row[0].row, seat.seat)
                            }"
                            @click="bookSeat(row[0].row, seat)"
                        >
                            {{ seat.seat }}
                        </span>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>Loading seats...</p>
            </div>
            <button @click="close">Close</button>
        </div>
        <SeatBooked
            v-if="showSeatBooked"
            :seatNumber="bookedSeat.seat"
            :rowNumber="bookedSeat.row"
            @close="handleSeatBookedClose" />
    </div>
</template>

<script>
import { fetchShowPlaces, bookPlace } from '@/services/cinema-api';
import SeatBooked from './SeatBooked.vue';

export default {
    name: 'BookTicket',
    components: {
        SeatBooked
    },
    props: {
        movieId: {
            type: Number,
            required: true
        },
        showDate: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            showPlaces: [],
            showSeatBooked: false,
            bookedSeat: { row: null, seat: null },
            bookedSeats: []
        };
    },
    async mounted() {
        await this.fetchShowPlaces();
    },
    methods: {
        async fetchShowPlaces() {
            try {
                const response = await fetchShowPlaces(this.movieId, this.showDate, this.time);
                this.showPlaces = response.data;
                console.log(this.showPlaces);
            } catch (error) {
                console.error('Error fetching show places:', error);
            }
        },
        async bookSeat(row, seat) {
            if (seat.is_free) {
                try {
                    const postData = {
                        movie_id: this.movieId,
                        row: row,
                        seat: seat.seat,
                        showdate: this.showDate,
                        daytime: this.time
                    };
                    await bookPlace(postData);
                    this.bookedSeat.row = row;
                    this.bookedSeat.seat = seat.seat;
                    this.showSeatBooked = true;
                    this.bookedSeats.push({ row: row, seat: seat.seat });
                    this.$emit('seat-booked');
                } catch (error) {
                    console.error('Error booking place:', error);
                }
            }
        },
        close() {
            this.$emit('close');
        },
        handleSeatBookedClose() {
            this.showSeatBooked = false;
        },
        isSeatBooked(row, seat) {
            return this.bookedSeats.some(b => b.row === row && b.seat === seat);
        }
    }
};
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-content {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    overflow-y: auto;
}

.row {
    margin-bottom: 10px;
}

.seats {
    display: flex;
    flex-wrap: wrap;
}

.seat {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
}

.seat.free {
    background-color: #28a745;
    color: white;
}

.seat.occupied {
    background-color: #dc3545;
    color: white;
    cursor: default;
}

.seat.booked {
    background-color: #dc3545;
    color: white;
    cursor: default;
}

button {
    width: fit-content;
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
