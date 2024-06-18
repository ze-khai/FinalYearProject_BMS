const express = require("express");
const connection = require("../connection/db");
const router = express.Router();

// router.get("/employee", (req, res) => {
//     //res.send("CRUD Operation");
//     let sql = "select * FROM employees";
//     let query = connection().query(sql, (err, rows) => {
//         if (err) throw err;
//         res.render("employee", {
//             title: "Employee Management",
//             employee: rows,
//         });
//     });
// });

// router.get("/edit/:employeeID", (req, res) => {
//     const employeeID = req.params.employeeID;
//     let sql = `SELECT * FROM employees where employeeID = '${employeeID}' `;
//     let query = connection().query(sql, (err, result) => {
//         if (err) throw err;
//         res.render("employeeUpdate", {
//             title: "Employee Management (Update Page)",
//             employee: result[0],
//         });
//     });
// });

// router.post("/updateEmp", (req, res) => {
//     const employeeID = req.body.employeeID;
//     let sql =
//         "UPDATE employees SET lastName='" +
//         req.body.lastName +
//         "', firstName='" +
//         req.body.firstName +
//         "', phone='" +
//         req.body.phone +
//         "', email='" +
//         req.body.email +
//         "', jobTitle='" +
//         req.body.jobTitle +
//         "', price='" +
//         req.body.price +
//         "' where userID ='" +
//         req.body.userID +
//         "'";
//     let query = connection().query(sql, (err, result) => {
//         if (err) throw err;
//         res.redirect("/product");
//     });
// });

// router.post("/addEmp", (req, res) => {
//     //let data = {productCode: req.body.productCode, productName: req.body.productName, productType: req.body.productType, productDescription: req.body.productDescription, quantityInStock: req.body.quantityInStock, price: req.body.price};
//     var lname = req.body.lastName;
//     var fname = req.body.firstName;
//     var phone = req.body.phone;
//     var email = req.body.email;
//     var jobT = req.body.jobTitle;
//     var uid = req.body.userID;
//     var password = req.body.password;
//     let sql3 = `SELECT employeeID from employees where email = '${email}'`;
//     let sql = `INSERT INTO employees (lastName, firstName, phone, email, jobTitle) VALUES (?, ?, ?, ?, ?)`;
//     let sql2 = `INSERT INTO users (Id, password, empID) VALUES (?, ?, ?)`;
//     let query = connection().query(
//         sql,
//         [lname, fname, phone, email, jobT],
//         (err, result) => {
//             if (err) throw err;
//         }
//     );
//     let query3 = connection().query(sql3, [email], (err, result1) => {
//         if (err) throw err;
//         else {
//             let query2 = connection().query(
//                 sql2,
//                 [uid, password, result1[0].employeeID],
//                 (err, result) => {
//                     if (err) throw err;
//                 }
//             );
//             //setValue(result1[0]);
//         }
//     });

//     res.redirect("/employee");
// });

// router.get("/deleteEmp/:employeeID", (req, res) => {
//     const employeeID = req.params.employeeID;
//     let sql = `DELETE FROM employees where employeeID = '${employeeID}' `;
//     let query = connection().query(sql, (err, result) => {
//         if (err) throw err;
//         res.redirect("/employee");
//     });
// });

//module.exports = router;
