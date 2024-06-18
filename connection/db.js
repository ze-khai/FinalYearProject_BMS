const mysql = require("mysql");
module.exports = () => {
    // pool = mysql.createPool({
    //     host: "eu-cdbr-west-02.cleardb.net",
    //     user: "b23f16019587d4",
    //     password: "c6eb58fc",
    //     database: "heroku_a9940e458c3a65b",
    //     dateStrings: true,
    //     connectionlimit: 200,
    // });

    pool = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "password",
        database: "bms",
        dateStrings: true,
        connectionlimit: 10,
    });

    // pool = mysql.createPool({
    //     //host: "34.69.188.106",
    //     user: "root",
    //     password: "password",
    //     database: "khai-boutique",
    //     socketPath: "/cloudsql/parabolic-base-347307:us-central1:khai-boutique",
    //     dateStrings: true,
    //     connectionlimit: 10,
    // });
    // pool = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "password",
    //     database: "bms",
    //     dateStrings: true,
    //     connectionlimit: 10,
    // });
    // pool = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "password",
    //     database: "bms",
    //     dateStrings: true,
    //     connectionlimit: 10,
    // });

    pool.getConnection(function (error, connection) {
        if (!!error) console.log(error);
        else {
            console.log("Database Connected");
            connection.release();
        }
    });

    // pool.releaseConnection = function releaseConnection(connection) {
    //     //Use the underlying connection from the mysql-module here:
    //     return this.pool.releaseConnection(connection.connection);
    // };

    // pool.end(function (err) {
    //     if (err) {
    //         return console.log(err.message);
    //     }
    //     // close all connections
    // });

    return pool;
};

// const mongoose = require("mongoose");

// const connectDB = async() =>{
//     try{
//         const con = await mongoose.connect('mongodb+srv://zekhai12:zekhai12@cluster0.qw3wc.mongodb.net/BMS?retryWrites=true&w=majority', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//             useCreateIndex: true
//         });
//         console.log(`MongoDB connected: ${con.connection.host}`);
//     }catch(err){
//         console.log(err);
//         process.exit(1);
//     }
// }

// mongoose.connect('mongodb+srv://zekhai12:zekhai12@cluster0.qw3wc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, { useUnifiedTopology: true }, (err) => {
//     if(!err){ console.log('MongoDB connection Succeeded.')}
//     else {console.log('Err in DB connection: ' + err)}
// });

// require('./product.model');
//module.exports = connectDB;
