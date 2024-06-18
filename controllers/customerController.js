const CustomerModel = require("../models/cust.model");

exports.readCustomerList = (req, res) => {
    CustomerModel.getAllCustomer((err, customers) => {
        if (err) throw err;
        res.render("customer", {
            title: "Customer Management",
            customer: customers,
        });
    });
};

exports.deleteCust = (req, res) => {
    CustomerModel.custDelete(req.params.customerID, (err, result) => {
        if (err) throw err;
        res.redirect("/customer");
    });
};

exports.goUpdateCust = (req, res) => {
    CustomerModel.goUpdateCust(req.params.customerID, (err, result) => {
        if (err) throw err;
        res.render("custUpdate", {
            title: "Customer Management (Update Page)",
            customer: result[0],
        });
    });
};

exports.updateCust = (req, res) => {
    const custReq = new CustomerModel(req.body);
    CustomerModel.custUpdate(custReq, (err, result) => {
        if (err) throw err;
        res.redirect("/customer");
    });
};

exports.addCustomer = (req, res) => {
    const custReq = new CustomerModel(req.body);
    CustomerModel.custAdd(custReq, (err, result) => {
        if (err) throw err;
        res.redirect("/customer");
    });
};

exports.searchCustomer = (req, res) => {
    CustomerModel.searchCustomer(req, (err, result) => {
        if (err) throw err;
        res.render("customer", {
            title: "Customer Management",
            customer: result,
        });
    });
};
