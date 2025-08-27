const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const stationRoutes = require('./routes/stationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// API routes
app.use('/api/users', userRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/bookings', bookingRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Bus Booking API");
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bus_booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error('MongoDB connection error:', err));

// ✅ Export app (for Vercel)
module.exports = app;

// ✅ Only run app.listen() in local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running locally on port ${PORT}`));
}
