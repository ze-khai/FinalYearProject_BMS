const EmployeeModel = require("../models/emp.model");

exports.readEmployeeList = (req, res) => {
    EmployeeModel.getAllEmployee((err, employees) => {
        if (err) throw err;
        res.render("employee", {
            title: "Employee Management",
            employee: employees,
        });
    });
};

exports.deleteEmployee = (req, res) => {
    EmployeeModel.empDelete(req.params.employeeID, (err, result) => {
        if (err) throw err;
        res.redirect("/employee");
    });
};

exports.addEmployee = (req, res) => {
    const empReq = new EmployeeModel(req.body);
    //const userReq = new EmployeeModel(req.body);
    EmployeeModel.empAdd(empReq, (err, result) => {
        if (err) throw err;
        res.redirect("/employee");
    });
};

exports.goUpdateEmp = (req, res) => {
    EmployeeModel.goUpdateEmp(req.params.employeeID, (err, result) => {
        if (err) throw err;
        res.render("empUpdate", {
            title: "Employee Management (Update Page)",
            employee: result[0],
        });
    });
};

exports.updateEmp = (req, res) => {
    const empReq = new EmployeeModel(req.body);
    EmployeeModel.empUpdate(empReq, (err, result) => {
        if (err) throw err;
        res.redirect("/employee");
    });
};

exports.searchEmployee = (req, res) => {
    EmployeeModel.searchEmployee(req, (err, result) => {
        if (err) throw err;
        res.render("employee", {
            title: "Employee Management",
            employee: result,
        });
    });
};
