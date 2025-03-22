const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/product');
const cors = require("cors")

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors())

// Define routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find({});
        res.json(products);
    }catch(error){
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});