const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
       await mongoose.connect(process.env.DB_CNN);
       console.log('DB Online')
    } catch (error) {
        console.log(error);
        throw new Error('There was an error initializing the database.')
    }
}

module.exports = {
    dbConnection
}