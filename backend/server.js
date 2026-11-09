const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({ message: 'API Shop-Mate UNKLAB Berjalan dengan Baik' });
});

app.listen(PORT, () => {
    console.log(`Server backend berjalan di port ${PORT}`);
});
