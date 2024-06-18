const OrderModel = require("../models/order.model");

exports.readOrderList = (req, res) => {
    OrderModel.getAllOrder((err, orders) => {
        if (err) throw err;
        res.render("order", {
            title: "Order Management (List)",
            order: orders,
        });
    });
};

exports.goUpdateOrder = (req, res) => {
    OrderModel.goUpdateOrd(req.params.orderID, (err, result) => {
        if (err) throw err;
        res.render("orderUpdate", {
            title: "Order Management (Update Page)",
            order: result[0],
        });
    });
};

// exports.updateOrder = (req, res) => {
//     //const ordReq = new OrderModel(req.body);
//     OrderModel.orderUpdate(req.order.orderID, req.order.status, (err, result) => {
//         if (err) throw err;
//         res.redirect("/order");
//     });
// };

exports.updateOrder = (req, res) => {
    OrderModel.orderUpdate(req, (err, result) => {
        if (err) throw err;
        res.redirect("/order");
    });
};

exports.deleteOrder = (req, res) => {
    OrderModel.orderDelete(req.params.orderID, (err, result) => {
        if (err) throw err;
        res.redirect("/order");
    });
};

exports.searchOrderList = (req, res) => {
    OrderModel.searchOrderList(req, (err, result) => {
        if (err) throw err;
        res.render("order", {
            title: "Order Management (List)",
            order: result,
        });
    });
};

exports.getOrderHistory = (req, res) => {
    OrderModel.getOrderHistory(req, (err, result) => {
        if (err) throw err;
        // res.json(result);
        res.render("orderHistory", {
            orderHistory: result,
        });
    });
};
