require("dotenv").config();

const path = require("path");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mysql = require("mysql");
const morgan = require("morgan");
const app = express();
const fs = require("fs");
const https = require("https");
const connection = require("./connection/db");
const router = require("./routes/router");
const empRoutes = require("./routes/empRoutes");
const webpush = require("web-push");
const { auth } = require("express-openid-connect");
const cookieParser = require("cookie-parser");
const multer = require("multer");
//const fileUpload = require('express-fileupload');

//const productController = require('./controllers/productController');
//const connectDB = require('./connection/db');

//log request
app.use(morgan("tiny"));
app.use(cookieParser());
//app.use(multer);

//Mongo connection
//connectDB();

//Mongo DB controller/router
//app.use('/product', productController);

//static file
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/notification", express.static(__dirname + "public/notification"));
app.use("/sw", express.static(path.join(__dirname, "/sw.js")));
app.use("/", express.static(__dirname));
//app.use(express.static(path.join(__dirname, "notification")));
//app.use("/notification", express.static(__dirname, "notification"));

//view file
app.set("views", path.join(__dirname, "/views"));

//set view enginex
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

//Auth

app.use(router);

//Web push
// const publicVapidKey = "BIRZMQa83NhC2HbkEqJjCGBuoisv8G1TCpCgylCQ-1qdB05v1O1CYPSkUiQ88oIgUvNx_Nz4MNWU7dCTSNavGtM";
// const privateVapidKey = "d1G6oL6fd_OUaPApqTCvBN-eRhT8aNmJMXs-qq2WU-w";
// webpush.setVapidDetails("malito:huamzk@gmail.com", publicVapidKey, privateVapidKey);

// app.post("/subscribe", (req, res) => {
//     //get push subscription object from the request
//     const subscription = req.body;

//     //send status 201 for the request
//     res.status(201).json({});

//     //create paylod: specified the detals of the push notification
//     const payload = JSON.stringify({ title: "Section.io Push Notification" });

//     //pass the object into sendNotification fucntion and catch any error
//     webpush.sendNotification(subscription, payload).catch((err) => console.error(err));
// });

//HTTPS Server
const sslServer = https.createServer(
    {
        //key: fs.readFileSync(path.join(__dirname, "cert", "localhost.key")),
        //cert: fs.readFileSync(path.join(__dirname, "cert", "localhost.cer")),
        //pfx: fs.readFileSync("cert/localhost.pfx"),
        pfx: fs.readFileSync(path.join(__dirname, "cert", "localhost.pfx")),
        passphrase: "localhost",
    },
    app
);

// app.get("/auth/facebook", passport.authenticate("facebook"));
// app.get(
//     "/facebook/callback",
//     passport.authenticate("facebook", {
//         successRedirect: "/",
//         failureRedirect: "/login",
//     })
// );

// https
//     .createServer(options, (req, res) => {
//         res.writeHead(200);
//         res.end("hi");
//     })
//     .listen(1337);

sslServer.listen(process.env.PORT || 8081, () => console.log("Secure Server on port 1337"));

// sslServer.listen(1337).on((error) => {
//     if (error.code === "EACCESS") {
//         console.log("Can't run on port 80. Please, run me as a sudo!");
//     }
// });

//app.listen(process.env.PORT || 1337);
