if (document.cookie.indexOf("fb_token") > 0)
    //user has already logged in with facebook - process should be automatic
    var fb_status = true;
else var fb_status = false;
window.fbAsyncInit = function () {
    FB.init({
        appId: "972203906866619",
        cookie: true,
        status: fb_status,
        xfbml: true,
        version: "v11.0",
    });

    FB.getLoginStatus(function (response) {
        // if (localStorage.getItem('LogInDetail') == true) {
        //     response.status === 'connected';
        // }
        statusChangeCallback(response);
    });
};
var fbId = "";

(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function statusChangeCallback(response) {
    if (response.status === "connected") {
        console.log("Logged in and authenticated");
        setElement(true);
        testAPI();
        //localStorage.setItem('LogInDetail', JSON.stringify(response));
    } else {
        console.log("Not authenticated");
        setElement(false);
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function testAPI() {
    FB.api("/me?fields=name,email,picture.width(200).height(200)", function (response) {
        if (response && !response.error) {
            //console.log(response);
            fbId = response.id;
            buildProfile(response);
        }
    });
}

function buildProfile(user) {
    console.log(user);
    // let profile = `<div class="modal-dialog">
    //         <div class="modal-content">
    //                 <div class="modal-header">
    //                     <h4 class="modal-title">Profile</h4>
    //                     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    //                 </div>
    //                 <div class="modal-body">
    //                         <img src = '${user.picture.data.url}''>
    //                         <br> <br>
    //                         <label>Name: </label>
    //                         <label id="fbName">${user.name}</label>
    //                         <br>
    //                         <label>ID: </label>
    //                         <label id="fbId">${user.id}</label>
    //                         <br>
    //                         <label>Email: </label>
    //                         <label>${user.email}</label>
    //                         <br>
    //                         <label>Gender: </label>
    //                         <label>${user.gender}</label>
    //                 </div>
    //         </div>
    //    </div>
    //           `;
    // //fbId = user.id;
    // document.getElementById("profileD").innerHTML = profile;
}

function setElement(isLoggedIn) {
    if (isLoggedIn) {
        //document.getElementById('fb-btn').style.display = 'none';
        document.getElementById("logout").style.display = "block";
        document.getElementById("profile").style.display = "block";
        document.getElementById("login").style.display = "none";
    } else {
        // document.getElementById('fb-btn').style.display = 'block';
        document.getElementById("logout").style.display = "none";
        document.getElementById("profile").style.display = "none";
        document.getElementById("login").style.display = "block";
    }
}

function logout() {
    FB.logout(function (response) {
        setElement(false);
        document.cookie = "userCust= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "cart= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/login";
    });
}
