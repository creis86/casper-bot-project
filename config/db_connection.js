const mongoose = require("mongoose");
const URI = "mongodb+srv://carlos-reis:creis86@cluster0.9w5jt.mongodb.net/casper-database?retryWrites=true&w=majority";

const dbConnection = () => {
    mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });
};

module.exports = () => {
    return dbConnection;
};
