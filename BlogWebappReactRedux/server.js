const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const dbConnection = require("./config/db");

const app = express();

//config
dotenv.config();

//mongodb-connection
dbConnection();

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/api/v1/post', require('./routes/postRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/comment', require('./routes/commentRoutes'));

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is running on port : ${process.env.PORT} on ${process.env.MODE} mode`.bgGreen)
})