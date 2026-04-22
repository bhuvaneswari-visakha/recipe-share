const mongoose = require('mongoose');

const mongoConnect = async () => {
   try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        dbConnection = conn; 
        console.log("Connection established successfully");
    } catch (error) {
        console.log("DB not connected",error);
    }
}

module.exports = {mongoConnect};

