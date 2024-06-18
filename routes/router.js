const express = require("express");
const fileUpload = require("express-fileupload");
const connection = require("../connection/db");
const productController = require("../controllers/productController");
const empController = require("../controllers/empController");
const custController = require("../controllers/customerController");
const orderController = require("../controllers/orderController");
const orderDetailController = require("../controllers/orderDetailController");
const userController = require("../controllers/userController");
const authController = require("../middleware/auth");
const cartController = require("../controllers/cartController");
const userCustController = require("../controllers/userCustController");
const router = express.Router();
require("dotenv").config();

if (process.env.NODE_ENV !== "production") {
    // require("dotenv").load();
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe = require("stripe")(stripeSecretKey);

//console.log(stripeSecretKey, stripePublicKey);

router.get("*", authController.checkLogin, userCustController.CustUserDetail);
//router.post("*", authController.checkLogin, cartController.cartDetail, userCustController.CustUserDetail);
//router.post("*", authController.checkLogin);

//Product
router.get("/product", authController.checkUser, productController.readProductList);
router.get(
    "/edit/:productCode",
    authController.checkUser,
    authController.staffNotAllowed,
    productController.goUpdateProduct
);
//var pcode = productController.updateProduct;
router.post(
    "/update",
    authController.checkUser,
    authController.staffNotAllowed,
    productController.updateProduct,
    productController.updateImage
);
// upload.single("productImg"),
// async (req, res) => {
//     // const newFile = await File.create({
//     //     name: req.files.filename,
//     // });
//     console.log("Upload ? " + req.files.productImg);
//     //console.log(req.body);
//     res.redirect("/product");
// }

// router.post(
//     "/update",
//     authController.checkUser,
//     authController.staffNotAllowed,
//     productController.updateProduct,
//     uploadProductImg.single("productImg"),
//     (req, res) => {
//         if (!req.files) {
//             console.log("No file upload");
//         } else {
//             productController.updateImage;

//             //console.log(req.files);
//             //console.log(req.body);

//             //var productCode = req.body.productCode;
//             //console.log(req.body);
//             // console.log("Product code = " + pcode);
//             // var file = req.files.productImg;

//             // var productImg = file.name;
//             // console.log(productImg);

//             // let sql = "UPDATE products SET productImg = ? WHERE productCode = ?";
//             // let query = connection().query(sql, productImg, pcode, (err, res) => {
//             //     if (err) throw err;
//             // });
//             res.redirect("/product");
//             //productController.updateImage;
//         }
//     }
// );

// router.post("/update", authController.checkUser, authController.staffNotAllowed, (req, res) => {
//     upload(req, res, function (err) {
//         if (err) throw err;
//         console.log(req.files);
//         if (!req.files) {
//             console.log("No file upload");
//         } else {
//             productController.updateImage;
//             productController.updateProduct;
//         }
//     });
// });

router.post("/add", authController.checkUser, authController.staffNotAllowed, productController.addProduct);
router.get(
    "/delete/:productCode",
    authController.checkUser,
    authController.staffNotAllowed,
    productController.deleteProduct
);
router.get("/searchProduct", authController.checkUser, productController.searchProduct);

//Employee
router.get("/employee", authController.checkUser, authController.staffNotAllowed, empController.readEmployeeList);
router.get("/deleteEmp/:employeeID", authController.checkUser, authController.adminOnly, empController.deleteEmployee);
router.post("/addEmp", authController.checkUser, authController.adminOnly, empController.addEmployee);
router.get("/editEmp/:employeeID", authController.checkUser, authController.adminOnly, empController.goUpdateEmp);
router.post("/updateEmp", authController.checkUser, authController.adminOnly, empController.updateEmp);
router.get("/searchEmployee", authController.checkUser, authController.staffNotAllowed, empController.searchEmployee);

//Customer
router.get("/customer", authController.checkUser, custController.readCustomerList);
router.post("/addCust", authController.checkUser, authController.staffNotAllowed, custController.addCustomer);
router.get(
    "/editCust/:customerID",
    authController.checkUser,
    authController.staffNotAllowed,
    custController.goUpdateCust
);
router.post("/updateCust", authController.checkUser, authController.staffNotAllowed, custController.updateCust);
router.get(
    "/deleteCust/:customerID",
    authController.checkUser,
    authController.staffNotAllowed,
    custController.deleteCust
);
router.get("/searchCustomer", authController.checkUser, custController.searchCustomer);

//Order
router.get("/order", authController.checkUser, orderController.readOrderList);
router.get("/editOrder/:orderID", authController.checkUser, orderController.goUpdateOrder);
router.post("/updateOrder", authController.checkUser, orderController.updateOrder);
router.get("/deleteOrder/:orderID", authController.checkUser, orderController.deleteOrder);
router.get("/searchOrderList", authController.checkUser, orderController.searchOrderList);

//router.post("/updateOrder", orderController.updateOrder);

//Order Details
router.get("/orderDetail", authController.checkUser, orderDetailController.getOrderDetailList);
router.get("/searchOrderDetail", authController.checkUser, orderDetailController.searchOrderDetail);

router.get("/analytics", authController.checkUser, authController.adminOnly, orderDetailController.getSalesAnalytic);

//Login
router.post("/loginUser", userController.checkUserLogin, authController.goHomePage);
router.get("/logout", authController.logout);

//router.post("*", checkLogin);
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Log in Page",
    });
});

//CLIENT SIDE
router.post("/loadCart", userCustController.loadCustUser, cartController.loadCart, authController.goHomePage);
// router.post("/loadCart")
//router.get("/", authController.goHomePage);
//:cartID
router.get("/", (req, res) => {
    res.render("index");
});

router.get("/categories", productController.readProductInCategories);
router.get("/productDetail/:productCode", productController.goProductDetail);
router.post("/addToCart", cartController.addToCart);
router.get("/cart", (req, res) => {
    res.render("cart", { title: "Cart" });
});
router.get("/removeCartItem/:cartID&:cartProductCode", cartController.removeCartItem);
router.post("/updateCartItem/:cartID&:cartProductCode", cartController.updateCartItem);
router.get("/clearCart/:cartID", cartController.clearCartItem);
router.get("/checkout", (req, res) => {
    res.render("checkout", { title: "Checkout", stripePublicKey: stripePublicKey });
});
router.post("/placeOrder", cartController.purchasePayment);
router.get("/orderHistory/:userID", orderController.getOrderHistory);
// router.post("/placeOrder", (req, res) => {
//     var stripeTokenId = req.body.stripeTokenId;
//     stripe.charges
//         .create({
//             amount: 203.1,
//             source: stripeTokenId,
//             currency: "usd",
//         })
//         .then(function () {
//             console.log("Charge Successful");
//             res.json({ message: "Successfully purchased items" });
//         })
//         .catch(function () {
//             console.log("Charge Fail");
//             res.status(500).end();
//         });
// });

// router.post("/placeOrder", orderController.placeOrder);
// router.get("/analytic");

module.exports = router;
