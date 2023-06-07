const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        if (conn) {
            console.log(`Mongodb connected successfully on host : ${mongoose.connection.host}`)
        } else {
            console.log('Something went wrong in mongodb connection');
        }
    } catch (error) {
        console.log(`Error in mongodbConnection : ${error}`)
    }
}

module.exports = dbConnection;