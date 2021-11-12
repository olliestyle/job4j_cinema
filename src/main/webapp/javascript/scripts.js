"use strict";
var contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));

function setActionToHallServlet() {
    var action = document.getElementById("action");
    action.setAttribute("action", contextPath + "/hall.do");
}

function validateIndex() {
    return getCheckedBoxes().length > 0;
}

function validatePayment() {
    var isValid = true;
    var username = document.getElementById('username').value;
    if (username === '') {
        alert("Заполните поле ФИО");
        isValid = false;
    }
    return isValid;
}

function validatePhoneNumber() {
    var isValid = true;
    var phone = document.getElementById('phone').value;
    var mustMatch = /^\+?([0-9])\)?[-]?([0-9]{3})[-]?([0-9]{3})[-]?([0-9]{2})[-]?([0-9]{2})$/;
    if (!phone.match(mustMatch)) {
        alert("Введите корректный номер телефона \"+7-999-999-99-99\"");
        isValid = false;
    }
    return isValid;
}

function redirectToPayment() {
    if (validateIndex()) {
        var checkedBoxes = getCheckedBoxes();
        var params = "?";
        for (var i = 0; i < checkedBoxes.length; i++) {
            if (i === checkedBoxes.length - 1) {
                params += checkedBoxes[i].getAttribute("id") + "=" + checkedBoxes[i].getAttribute("value");
            } else {
                params += checkedBoxes[i].getAttribute("id") + "=" + checkedBoxes[i].getAttribute("value") + "&";
            }
        }
        window.location.href = contextPath + "/payment.html" + params;
    } else {
        alert("Вы не выбрали ни одного места");
    }
}

function getCheckedBoxes() {
    var checkBoxes = document.getElementsByName("place");
    var checkBoxesChecked = [];
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            checkBoxesChecked.push(checkBoxes[i]);
        }
    }
    return checkBoxesChecked;
}

function addRow() {
    var params = decodeURIComponent(window.location.search).substring(1).split("&");
    var amount = 0;
    for (var i = 0; i < params.length; i++) {
        var str = params[i];
        amount += parseInt(str.substring(str.indexOf("=") + 1));
        $('#choice').append('<h5>'
                            + ' Ряд: ' + str.charAt(0)
                            + ' Место: ' + str.charAt(1)
                            + ' Цена: ' + str.substring(str.indexOf("=") + 1)
                            + '</h5>');
    }
    $('#choice').append('<h5>' + 'Общая стоимость билетов: ' + amount + '</h5>');
}

function setOccupiedPlaces() {
    var occupiedPlaces = [];
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const id of urlParams.keys()) {
        occupiedPlaces.push(id);
    }
    var places = document.getElementById('places');
    places.setAttribute('value', occupiedPlaces.toString());
}