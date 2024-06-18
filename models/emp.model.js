var connection = require("../connection/db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var Employee = function (employee) {
    this.employeeID = employee.employeeID;
    this.lastName = employee.lastName;
    this.firstName = employee.firstName;
    this.phone = employee.phone;
    this.email = employee.email;
    this.jobTitle = employee.jobTitle;
    this.Id = employee.Id;
    this.password = employee.password;
    this.empID = employee.empID;
};

// var User = function (user) {

// };

Employee.getAllEmployee = (result) => {
    let sql = "SELECT * FROM employees";
    //connection().getConnection();
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;

        result(null, res);
    });
};

Employee.empDelete = (employeeID, result) => {
    let sql = `DELETE FROM employees where employeeID = ?`;
    let query = connection().query(sql, employeeID, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Employee.empAdd = async (empReq, result) => {
    let sql = `INSERT INTO employees (lastName, firstName, phone, email, jobTitle) VALUES (?, ?, ?, ?, ?)`;
    let sql2 = `SELECT employeeID from employees where email = ?`;
    let sql3 = `INSERT INTO users (Id, password, empID, role) VALUES (?, ?, ?, ?)`;
    var lname = empReq.lastName;
    var fname = empReq.firstName;
    var phone = empReq.phone;
    var email = empReq.email;
    var jobT = empReq.jobTitle;
    var uid = empReq.Id;
    var password = empReq.password;
    password = password.toString();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let query = connection().query(sql, [lname, fname, phone, email, jobT], (err, res) => {
        if (err) throw err;
        else {
            let query2 = connection().query(sql2, [email], (err, result1) => {
                if (err) throw err;
                else {
                    let query3 = connection().query(
                        sql3,
                        [uid, hashedPassword, result1[0].employeeID, jobT],
                        (err, res) => {
                            if (err) throw err;
                            result(null, res);
                        }
                    );
                }
            });
        }
    });
};

Employee.goUpdateEmp = (employeeID, result) => {
    let sql = `SELECT * FROM employees WHERE employeeID = ?`;
    let query = connection().query(sql, employeeID, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Employee.empUpdate = (empReq, result) => {
    let sql =
        "UPDATE employees SET lastName = ?, firstName = ?, phone = ?, email = ?, jobTitle = ? where employeeID = ?;";
    var employeeID = empReq.employeeID;
    var lname = empReq.lastName;
    var fname = empReq.firstName;
    var phone = empReq.phone;
    var email = empReq.email;
    var jobT = empReq.jobTitle;
    let query = connection().query(sql, [lname, fname, phone, email, jobT, employeeID], (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Employee.searchEmployee = (req, result) => {
    var employeeName = req.query.searchEmployee;
    let sql =
        'SELECT * from employees where firstName like "%' +
        employeeName +
        '%" OR lastName like "%' +
        employeeName +
        '%"';
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        // var data = [];
        // for (i = 0; i < res.length; i++) {
        //     data.push(res[i].productName);
        // }
        // connection().release();
        result(null, res);
    });
};

module.exports = Employee;
