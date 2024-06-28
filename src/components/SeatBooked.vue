<template>
    <div class="popup-overlay">
        <div class="popup-content">
            <h2>Seat Booked</h2>
            <p>Your seat {{ seatNumber }} in row {{ rowNumber }} has been successfully booked.</p>
            <button @click="close">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SeatBooked',
    props: {
        seatNumber: {
            type: Number,
            required: true
        },
        rowNumber: {
            type: Number,
            required: true
        }
    },
    methods: {
        close() {
            this.$emit('close');
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    text-align: center;
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
