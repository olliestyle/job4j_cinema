"use strict";
var contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));

function validateSession(session) {
    var isVaild = true;
    if (session === '') {
        alert("Выберите сеанс");
        isVaild = false;
    }
    return isVaild;
}


function redirectToBooking() {
    var session = document.getElementById('films').elements["film"].value;
    if (validateSession(session)) {
        window.location.href = contextPath + "/booking.html?session=" + session;
    }
}
