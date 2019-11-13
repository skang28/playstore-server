const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const playstore = require('./playstore-data.js');

app.get('/playstore', (req, res) => {
    const {sort, genre} = req.query;
    const genres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res.status(400).send('Sort must be one of rating or app')
        }
    }

    if (sort) {
        playstore
            .sort((a,b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
    }

    if (genre) {
        if (!genres.some(gen => genre.includes(gen))) {
            return res.status(400).send('genre must be one from the list')
        }
    }

    res.json(playstore);
})

app.listen(8000, () => {
    console.log('Server started on port 8000');
})