"use strict";
var contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));

function setContextPath() {
    document.getElementById('toIndex').href = contextPath;
}