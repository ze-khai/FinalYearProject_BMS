const orderDetailModel = require("../models/orderDetail.model");
const ProductModel = require("../models/product.model");

exports.getOrderDetailList = (req, res) => {
    orderDetailModel.getAllDetail((err, orderDetails) => {
        if (err) throw err;
        res.render("orderDetail", {
            title: "Order Management (Detail)",
            orderDetail: orderDetails,
        });
    });
};

exports.getSalesAnalytic = (req, res) => {
    ProductModel.getProductCodeQuan((err, categoryAnalytics) => {
        if (err) throw err;
        var category = categoryAnalytics;
        ProductModel.getProductTypeAnalytic((err, analytics) => {
            if (err) throw err;
            console.log(categoryAnalytics);
            console.log(analytics);
            res.render("analytics", {
                title: "Analytic",
                analytic: analytics,
                categoryAnalytic: category,
                //JSON.stringify()
            });
        });
    });
};

exports.searchOrderDetail = (req, res) => {
    orderDetailModel.searchOrderDetail(req, (err, result) => {
        if (err) throw err;
        res.render("orderDetail", {
            title: "Order Management (Detail)",
            orderDetail: result,
        });
    });
};
