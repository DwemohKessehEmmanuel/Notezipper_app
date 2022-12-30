const express = require('express');
// const notes = require('./data/notes');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')
const userRoutes = require('./Routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const noteRoutes = require('./Routes/noteRoutes')
const app = express();
connectDB();
app.use(express.json());





app.get('/', (req, res) => {
    res.send('Our API is running')
})

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)



app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`)
})