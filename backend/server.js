const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')

const app = express();
connectDB()

const PORT = process.env.PORT || 5000; 

app.get('/', (req, res) => {
    res.send('Our API is running')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})
app.get('/api/notes/:id', (req, res) => {
    const note = notes.find((n) => n._id === req.params.id)
    res.send(note)
})


app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`)
})