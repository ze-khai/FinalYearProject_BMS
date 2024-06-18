if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        console.log("Service Worker and Push is supported");

        navigator.serviceWorker
            .register("/sw.js", {
                scope: "/",
            })
            .then((swReg) => {
                console.log("Service Worker is registered", swReg);

                swRegistration = swReg;
                //messaging.useServiceWorker(swRegistration);
                // TODO 3.3a - call the initializeUI() function
                initializeUI();
            })
            .catch((err) => {
                console.error("Service Worker Error", err);
            });
    });
} else {
    console.warn("Push messaging is not supported");
    pushButton.textContent = "Push Not Supported";
}
