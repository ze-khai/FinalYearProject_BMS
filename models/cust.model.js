var connection = require("../connection/db");

var Customer = function (customer) {
    this.customerID = customer.customerID;
    this.fullName = customer.fullName;
    this.birthday = customer.birthday;
    this.phone = customer.phone;
    this.email = customer.email;
};

//let connection = pool.getConnection();

// var User = function (user) {

// };

Customer.getAllCustomer = (result) => {
    let sql = "SELECT * FROM customers";
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Customer.custDelete = (customerID, result) => {
    let sql = `DELETE FROM customers where customerID = ?`;
    let query = connection().query(sql, customerID, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Customer.custAdd = (custReq, result) => {
    let sql = `INSERT INTO customers (fullName, birthday, phone, email) VALUES (?, ?, ?)`;
    let sql2 = `SELECT employeeID from employees where email = ?`;
    let sql3 = `INSERT INTO users (Id, password, empID) VALUES (?, ?, ?)`;
    var fname = custReq.fullName;
    var phone = custReq.phone;
    var birthday = custReq.birthday;
    var email = custReq.email;

    let query = connection().query(sql, [fname, birthday, phone, email], (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Customer.goUpdateCust = (customerID, result) => {
    let sql = `SELECT * FROM customers WHERE customerID = ?`;
    let query = connection().query(sql, customerID, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Customer.custUpdate = (custReq, result) => {
    let sql = `UPDATE customers SET fullName = ?, birthday = ?, phone = ?, email = ? WHERE customerID = ?`;
    var customerID = custReq.customerID;
    var fname = custReq.fullName;
    var birthday = custReq.birthday;
    var phone = custReq.phone;
    var email = custReq.email;
    let query = connection().query(sql, [fname, birthday, phone, email, customerID], (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Customer.searchCustomer = (req, result) => {
    var custID = req.query.searchCustomer;
    let sql = 'SELECT * from customers where customerID like "%' + custID + '%"';
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        // var data = [];
        // for (i = 0; i < res.length; i++) {
        //     data.push(res[i].productName);
        // }
        result(null, res);
    });
};

module.exports = Customer;
