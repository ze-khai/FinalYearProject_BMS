(function ($) {
    "use strict";

    // :: 1.0 Fullscreen Active Code
    // :: 2.0 Welcome Slider Active Code
    // :: 3.0 Related Product Active Code
    // :: 4.0 Testimonials Slider Active Code
    // :: 5.0 Gallery Menu Style Active Code
    // :: 6.0 Masonary Gallery Active Code
    // :: 7.0 Header Cart btn Active Code
    // :: 8.0 Side Menu Active Code
    // :: 9.0 Magnific-popup Video Active Code
    // :: 10.0 ScrollUp Active Code
    // :: 11.0 Slider Range Price Active Code
    // :: 12.0 PreventDefault a Click
    // :: 13.0 wow Active Code

    let userId = "";
    // let myPromise = new Promise(function (checkLoginState, myReject) {});

    function getUserId() {
        var empId = $("#empId").text().replace("Welcome, ", "");
        console.log(empId);

        var fbId = $("#profileD .modal-content .modal-body #fbId").text();
        console.log(fbId);

        if (!empId) {
            userId = fbId;
            console.log(userId);
        } else {
            userId = empId;
            console.log(userId);
        }
    }

    // document.addEventListener("DOMContentLoaded", function (event) {
    //     //do work
    //     // getUserId();
    //     // loadHeaderCart(userId);
    //     // loadCartItems(userId);
    //     // cartTotal(userId);
    // });

    // loading = setInterval(function () {
    //     if (document.getElementById("profileD")) {
    //         // Element Has Loaded, Put your code here!
    //         console.log("OK");
    //     }
    // }, 1000);

    // if(document.getElementById("profileD")){

    // }

    window.onload = function WindowLoad(event) {
        //console.log(document.getElementsByClassName("quantity")[0]);
        $(".cart-submit").on("click", function () {
            createAddCartForm();
        });
        $(".removeCartProduct").on("click", function () {
            alert("Item have been removed from Cart");
        });

        document.getElementsByClassName("karl-checkout-btn")[0].addEventListener("click", purchaseClicked);
        //document.getElementsByClassName("showOrderDetail")[0].addEventListener("click", showOrderDetail);
        // $(".updateCartProduct").on("click", function () {
        //     //document.getElementById("update-cart-form").innerHTML = cartForm;
        //     var form = document.getElementById("update-cart-form");
        //     //console.log(form);
        //     form.submit();
        //     alert("Item have been updated");
        // });
        // $(".updateCartProduct").on("click", function () {
        //     //document.getElementById("update-cart-form").innerHTML = cartForm;
        //     var form = document.getElementById("update-cart-form");
        //     //console.log(form);
        //     form.submit();
        //     alert("Item have been updated");
        // });

        var cartID = $(".cart-table h6.cartID")[0].innerText;
        console.log(cartID);
        setTimeout(getUserId, 1000);

        //setTimeout(loadHeaderCart, 1500);
        //setTimeout(loadCartItems, 1500);
        //setTimeout(cartTotal, 1500);
    };

    var $window = $(window);

    // :: 1.0 Fullscreen Active Code
    $window.on("resizeEnd", function () {
        $(".full_height").height($window.height());
    });

    $window
        .on("resize", function () {
            if (this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function () {
                $(this).trigger("resizeEnd");
            }, 300);
        })
        .trigger("resize");

    var welcomeSlide = $(".welcome_slides");

    // :: 2.0 Welcome Slider Active Code
    if ($.fn.owlCarousel) {
        welcomeSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 7000,
            smartSpeed: 1000,
        });
    }

    // :: 3.0 Related Product Active Code
    if ($.fn.owlCarousel) {
        $(".you_make_like_slider").owlCarousel({
            items: 3,
            margin: 30,
            loop: true,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 7000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
            },
        });
    }

    welcomeSlide.on("translate.owl.carousel", function () {
        var slideLayer = $("[data-animation]");
        slideLayer.each(function () {
            var anim_name = $(this).data("animation");
            $(this)
                .removeClass("animated " + anim_name)
                .css("opacity", "0");
        });
    });

    welcomeSlide.on("translated.owl.carousel", function () {
        var slideLayer = welcomeSlide.find(".owl-item.active").find("[data-animation]");
        slideLayer.each(function () {
            var anim_name = $(this).data("animation");
            $(this)
                .addClass("animated " + anim_name)
                .css("opacity", "1");
        });
    });

    $("#header-cart-btn").on("click", function () {
        $("body").toggleClass("cart-data-open");
    });

    $("[data-delay]").each(function () {
        var anim_del = $(this).data("delay");
        $(this).css("animation-delay", anim_del);
    });

    $("[data-duration]").each(function () {
        var anim_dur = $(this).data("duration");
        $(this).css("animation-duration", anim_dur);
    });

    // :: 4.0 Testimonials Slider Active Code
    if ($.fn.owlCarousel) {
        $(".karl-testimonials-slides").owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            dots: true,
            autoplay: true,
            smartSpeed: 1200,
        });
    }

    // :: 5.0 Gallery Menu Style Active Code
    $(".portfolio-menu button.btn").on("click", function () {
        $(".portfolio-menu button.btn").removeClass("active");
        $(this).addClass("active");
    });

    $(".menu-content li .sub-menu li").on("click", function () {
        // if ($(".menu-content li .sub-menu li .active") == true) {

        //console.log(this.classList.contains("active"));
        $(".menu-content li .sub-menu li").removeClass("active");
        //$(".menu-content li").removeClass("show");
        //}
        $(this).addClass("active");
    });

    $(".menu-content li").on("click", function () {
        //$(this).addClass("active");

        $(".menu-content li").removeClass("show");

        $(this).addClass("show");
    });

    $(".portfolio-menu a").on("click", function () {
        //$(this).addClass("active");

        $(".menu-content li").removeClass("show");
        $(".menu-content li .sub-menu li").removeClass("active");
        //$(this).addClass("show");
    });

    // :: 6.0 Masonary Gallery Active Code
    if ($.fn.imagesLoaded) {
        $(".karl-new-arrivals").imagesLoaded(function () {
            // filter items on button click
            $(".portfolio-menu").on("click", "button", function () {
                var filterValue = $(this).attr("data-filter");
                $grid.isotope({
                    filter: filterValue,
                });
            });
            // init Isotope
            var $grid = $(".karl-new-arrivals").isotope({
                itemSelector: ".single_gallery_item",
                percentPosition: true,
                masonry: {
                    columnWidth: ".single_gallery_item",
                },
            });
        });
    }

    if ($.fn.imagesLoaded) {
        $(".categories-filter").imagesLoaded(function () {
            // filter items on button click
            $(".portfolio-menu").on("click", "a", function () {
                var filterValue = $(this).attr("data-filter");
                $grid.isotope({
                    filter: filterValue,
                });
            });
            // init Isotope
            var $grid = $(".categories-filter").isotope({
                itemSelector: ".single_gallery_item",
                percentPosition: true,
                masonry: {
                    columnWidth: ".single_gallery_item",
                },
            });
        });
    }
    //console.log(document.getElementById("#header-cart-btn"));
    //console.log($("#header-cart-btn"));
    // :: 7.0 Header Cart btn Active Code

    // :: 8.0 Side Menu Active Code
    $("#sideMenuBtn").on("click", function () {
        $("#wrapper").toggleClass("karl-side-menu-open");
    });
    $("#sideMenuClose").on("click", function () {
        $("#wrapper").removeClass("karl-side-menu-open");
    });

    // :: 9.0 Magnific-popup Video Active Code
    if ($.fn.magnificPopup) {
        $(".video_btn").magnificPopup({
            disableOn: 0,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false,
        });
        $(".gallery_img").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });
    }

    // :: 10.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: "easeInOutQuart",
            scrollText: '<i class="ti-angle-up" aria-hidden="true"></i>',
        });
    }

    // :: 11.0 Slider Range Price Active Code
    $(".slider-range-price").each(function () {
        var min = jQuery(this).data("min");
        var max = jQuery(this).data("max");
        var unit = jQuery(this).data("unit");
        var value_min = jQuery(this).data("value-min");
        var value_max = jQuery(this).data("value-max");
        var label_result = jQuery(this).data("label-result");
        var t = $(this);
        $(this).slider({
            range: true,
            min: min,
            max: max,
            values: [value_min, value_max],
            slide: function (event, ui) {
                var result = label_result + " " + unit + ui.values[0] + " - " + unit + ui.values[1];
                console.log(t);
                t.closest(".slider-range").find(".range-price").html(result);
            },
        });
    });

    // :: 12.0 PreventDefault a Click
    $("a[href='#']").on("click", function ($) {
        $.preventDefault();
    });

    // :: 13.0 wow Active Code
    if ($window.width() > 767) {
        new WOW().init();
    }

    $(".widget.size .widget-desc li").on("click", function () {
        //$(this).addClass("active");

        $(".widget.size .widget-desc li").removeClass("active");

        $(this).addClass("active");
    });

    $("#update-cart").on("click", function () {
        //updateCart(userId);
    });

    $("#clear-cart").on("click", function () {
        //localStorage.removeItem("cartProduct" + userId);
        alert("All products has been removed from cart");
        //window.location.reload();
    });
    //console.log(cartID);

    //Checkout
    var stripeHandler = StripeCheckout.configure({
        key: stripePublicKey,
        locale: "auto",
        token: function (token) {
            //var methodName = "/placeOrder" + cartID;
            var cartID = $("h6.cartID")[0].innerText;
            var receiverName = $("#receiverName").val();
            var shipAddress = $("#shipAddress").val();
            var shipAddress2 = $("#shipAddress2").val();
            var shipPostalCode = $("#shipPostalCode").val();
            var shipCity = $("#shipCity").val();
            var shipState = $("#shipState").val();
            var receiverPhone = $("#receiverPhone").val();
            var shipPostalCode = $("#shipPostalCode").val();

            fetch("/placeOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    stripeTokenId: token.id,
                    cartID: cartID,
                    staffUserID: staffUserID,
                    custName: custName,
                    custUserID: custUserID,

                    custEmail: custEmail,
                    receiverName: receiverName,
                    shipAddress: shipAddress,
                    shipAddress2: shipAddress2,
                    shipPostalCode: shipPostalCode,
                    shipCity: shipCity,
                    shipState: shipState,
                    receiverPhone: receiverPhone,
                }),
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    alert(data.message);
                    window.location.reload();
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
    });
    // var f = document.getElementById("#place-order");
    // console.log(f);
    function showOrderDetail() {}

    function purchaseClicked() {
        // var f = document.getElementById("#place-order");
        // if (f.checkValidity()) {
        //     console.log("Filled");
        // } else {
        //     alert(document.getElementById("#receiverPhone").validationMessage);
        // }
        var form = $("#place-order");
        form.validate();
        if (form.valid() == false) {
            alert("Please Fill up ALL Fields");
        } else {
            var priceElement = $(".order-details-form li span.total-price").text();
            var price = parseFloat(priceElement.replace("RM", "")) * 100;

            console.log(custName);
            console.log(custUserID);
            console.log(custEmail);
            stripeHandler.open({
                amount: price,
                currency: "myr",
            });
        }
    }

    //CART
    function createAddCartForm() {
        var cartID = $("h4.cartID")[0].innerText;
        var productType = $("#productType").text();
        var productName = $("h4.title")[0].innerText;
        var productCode = $(".productCode").val();
        var quantity = parseInt($(".single_product_desc .cart .qty-text").val());
        var size = $(".widget.size .widget-desc li.active a").text();
        var price = parseFloat($(".single_product_desc span.price")[0].innerText);
        var image = document
            .getElementsByClassName("gallery_img")[0]
            .getElementsByTagName("img")[0]
            .getAttribute("src");
        var items = [];
        var productImg = image.replace("/img/product-img/", "");
        console.log(cartID);
        console.log(productCode);
        console.log(productName);
        console.log(price);
        console.log(quantity);
        console.log(size);
        console.log(productImg);

        if (!size && productType != "Accessories") {
            alert("Pick a Size of your product");
        } else {
            let cartForm = `<form id="add-cart" action="/addToCart" method="POST">
            <input type="number" hidden="true" value="${cartID}" name="cartID" />
            <input type="text" hidden="true" value="${productCode}" name="productCode" />
            <input type="text" hidden="true" value="${productName}" name="productName" />
            <input type="text" hidden="true" value="${productType}" name="productType" />
            <input type="number" step="0.01" hidden="true" value="${price}" name="price" />
            <input type="number" hidden="true" value="${quantity}" name="quantity" />
            <input type="text" hidden="true" value="${size}" name="size" />
            <input type="text" hidden="true" value="${productImg}" name="productImg" />
        </form>`;

            document.getElementById("add-cart-form").innerHTML = cartForm;
            var form = document.getElementById("add-cart");
            //console.log(form);
            form.submit();
            alert("Product Added to cart");
        }
    }

    function addCart() {
        var productType = $("#productType").text();
        var productName = $("h4.title")[0].innerText;
        var productCode = $(".productCode").val();
        var quantity = parseInt($(".single_product_desc .cart .qty-text").val());
        var size = $(".widget.size .widget-desc li.active a").text();
        var price = parseFloat($(".single_product_desc span.price")[0].innerText);
        var image = document
            .getElementsByClassName("gallery_img")[0]
            .getElementsByTagName("img")[0]
            .getAttribute("src");
        var items = [];

        console.log(productName);
        console.log(productCode);
        console.log(quantity);
        console.log(size);
        console.log(price);
        console.log(image);
        if (!size && productType != "Accessories") {
            alert("Pick a Size of your product");
        } else {
            //Add to Cart
            if (typeof Storage !== "undefined") {
                // Code for localStorage/sessionStorage.
                var item = {
                    productCode: productCode,
                    productName: productName,
                    quantity: quantity,
                    price: price,
                    productImg: image,
                    size: size,
                };
                if (JSON.parse(localStorage.getItem("cartProduct" + userId)) === null) {
                    items.push(item);
                    localStorage.setItem("cartProduct" + userId, JSON.stringify(items));
                    alert("Product Added to cart");
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem("cartProduct" + userId));
                    localItems.map(function (data) {
                        if (item.productCode == data.productCode && item.size == data.size) {
                            item.quantity = item.quantity + data.quantity;
                        } else {
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem("cartProduct" + userId, JSON.stringify(items));
                    alert("Product Added to cart");
                    window.location.reload();
                    //localStorage.setItem
                }
            } else {
                // Sorry! No Web Storage support..
            }
        }
    }

    function loadHeaderCart() {
        //console.log(document.querySelector(".cart-list"));
        const headerCartBox = document.querySelector(".cart");
        //const headerCartBox2 = document.querySelector(".cart-list");
        let headerCart = "";
        var totalPrice = 0;
        var cartProduct = JSON.parse(localStorage.getItem("cartProduct" + userId));
        if (!cartProduct) {
            headerCart +=
                `<a href="#" id="header-cart-btn" ><span class="cart_quantity">` +
                0 +
                `</span> <i class="ti-bag"></i> Your Bag RM` +
                parseFloat(0).toFixed(2) +
                `</a><ul class="cart-list">`;

            headerCart +=
                `
            <li class="total">
            <span class="pull-right">Total: RM` +
                parseFloat(0).toFixed(2) +
                `</span>
            <a href="/cart" class="btn btn-sm btn-cart">Cart</a>
            <a href="/checkout" class="btn btn-sm btn-checkout">Checkout</a>
             </li></ul>`;
        } else {
            cartProduct.forEach((cartProducts) => {
                //console.log(cartProducts.price);
                totalPrice += cartProducts.price * cartProducts.quantity;
            });
            headerCart +=
                `<a href="#" id="header-cart-btn" ><span class="cart_quantity">` +
                cartProduct.length +
                `</span> <i class="ti-bag"></i> Your Bag RM` +
                parseFloat(totalPrice).toFixed(2) +
                `</a><ul class="cart-list">`;

            cartProduct.map((data) => {
                headerCart +=
                    `    
                    <li>
                        <a href="#" class="image"
                            ><img src="` +
                    data.productImg +
                    `" class="cart-thumb" alt=""
                        /></a>
                        <div class="cart-item-desc">
                            <h6><a href="#">` +
                    data.productName +
                    `</a></h6>
                            <p>` +
                    data.quantity +
                    `x - <span class="price">RM` +
                    data.price +
                    `</span></p>
                        </div>
                        <span class="dropdown-product-remove"
                            ><i class="icon-cross"></i
                        ></span>
                    </li>  
                `;
            });

            headerCart +=
                `
            <li class="total">
            <span class="pull-right">Total: RM` +
                parseFloat(totalPrice).toFixed(2) +
                `</span>
            <a href="/cart" class="btn btn-sm btn-cart">Cart</a>
            <a href="/checkout" class="btn btn-sm btn-checkout">Checkout</a>
             </li></ul>`;
        }

        headerCartBox.innerHTML = headerCart;
        $("#header-cart-btn").on("click", function () {
            $("body").toggleClass("cart-data-open");
        });
        //headerCartBox2.innerHTML = headerCart2;
    }

    function loadCartItems() {
        var count = 0;
        console.log($(".cart-table tbody")[0]);
        const cardBox = document.querySelector(".cart-table");
        const cardBoxTable = cardBox.querySelector("tbody");
        //console.log(cardBoxTable);
        let tableData = "";
        if (JSON.parse(localStorage.getItem("cartProduct" + userId)) === null) {
            tableData += '<tr><td colspan="5">No items found </td></tr>';
        } else {
            JSON.parse(localStorage.getItem("cartProduct" + userId)).map((data) => {
                tableData +=
                    `<tr><td class="cart_product_img d-flex align-items-center"><a href="#"><img src="` +
                    data.productImg +
                    `" alt="Product"/></a><h6>` +
                    data.productName +
                    `</h6></td><td class="price"><span>RM` +
                    parseFloat(data.price).toFixed(2) +
                    `</span></td><td class="size"><span>` +
                    data.size +
                    `</span></td><td class="qty"><div class="quantity"><span class="qty-minus" onclick="var effect = document.getElementById('qty` +
                    count +
                    `'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) effect.value--;return false;"><i class="fa fa-minus" aria-hidden="true"></i></span><input type="number" class="qty-text" id="qty` +
                    count +
                    `" step="1" min="1" max="99" name="quantity" value="` +
                    data.quantity +
                    `"/><span class="qty-plus" onclick="var effect = document.getElementById('qty` +
                    count +
                    `'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i class="fa fa-plus" aria-hidden="true"></i></span></div></td><td class="total_price"><span>RM` +
                    parseFloat(data.quantity * data.price).toFixed(2) +
                    `</span></td><td><a class="removeCartProduct" onclick="removeProduct(event, userId)" href="#"><i class="fa fa-trash"></i></a></td></tr>`;

                count++;
                console.log(count);
            });
        }
        cardBoxTable.innerHTML = tableData;
    }

    function cartTotal() {
        const cartTotalBox = document.querySelector(".cart-total-chart");
        var totalData = "";
        var cartProduct = JSON.parse(localStorage.getItem("cartProduct" + userId));
        var totalPrice = 0;
        cartProduct.forEach((cartProducts) => {
            //console.log(cartProducts.price);
            totalPrice += cartProducts.price * cartProducts.quantity;
        });
        //console.log(totalPrice);

        if (cartProduct === null) {
        } else {
            totalData +=
                `<ul class="cart-total-chart">
            <li><span>Subtotal</span> <span>RM` +
                parseFloat(totalPrice).toFixed(2) +
                `</span></li>
            <li><span>Shipping</span> <span>Free</span></li>
            <li>
                <span><strong>Total</strong></span> <span><strong>RM` +
                parseFloat(totalPrice).toFixed(2) +
                `</strong></span>
            </li>
        </ul>`;
        }
        cartTotalBox.innerHTML = totalData;
    }

    function updateCart() {
        console.log($("#qty" + 0).val());
        var cartItem = JSON.parse(localStorage.getItem("cartProduct" + userId));
        console.log(cartItem);
        for (var i = 0; i < cartItem.length; i++) {
            var newQuantity = parseInt($("#qty" + i).val());
            cartItem[i].quantity = newQuantity;
        }
        localStorage.setItem("cartProduct" + userId, JSON.stringify(cartItem));
        alert("Cart Updated Successfully");
        window.location.reload();
        //console.log(parseInt($(".qty .quantity #qty")[1].value));

        // var req = new XMLHttpRequest();
        // req.open("get", "");
        // req.onload = function () {
        //     //var content = document.getElementById("");
        //     const cardBox = document.querySelector(".cart-table");
        //     const cardBoxTable = cardBox.querySelector("tbody");
        //     cardBoxTable.innerHTML = this.responseText;
        // };
    }

    function removeProduct() {
        console.log(e.parentElement.parentElement.children[0].textContent);
        var items = [];
        JSON.parse(localStorage.getItem("cartProduct" + userId)).map((data) => {
            if (data.productCode != e.parentElement.parentElement.children[0].textContent) {
                items.push(data);
            }
        });
        localStorage.setItem("cartProduct" + userId, JSON.stringify(items));
        window.location.reload;
    }

    //getUserId();
})(jQuery);
