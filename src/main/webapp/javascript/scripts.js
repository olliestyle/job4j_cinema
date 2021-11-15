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
    var userEmail = document.getElementById('userEmail').value;
    if (username === '') {
        alert("Заполните поле ФИО");
        isValid = false;
    }
    if (userEmail === '') {
        alert("Заполните поле Email");
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
                params += "cell" + i + "=row" + checkedBoxes[i].getAttribute("data-row")
                        + "place" + checkedBoxes[i].getAttribute("data-place")
                        + "price" + checkedBoxes[i].getAttribute("value")  + "&";
        }
        var session = document.getElementById('movieSession').getAttribute('data-value');
        window.location.href = contextPath + "/payment.html" + params + "session=" + session;
    } else {
        alert("Вы не выбрали ни одного места");
    }
}

function getCheckedBoxes() {
    var checkBoxes = document.getElementsByName("cell");
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
    params.pop();
    for (var i = 0; i < params.length; i++) {
        var str = params[i];
        var row = str.substring(str.indexOf("row") + 3, str.indexOf("place"));
        var place = str.substring(str.indexOf("place") + 5, str.indexOf("price"));
        var price = str.substring(str.indexOf("price") + 5);
        amount += parseInt(price);
        $('#choice').append('<h5>'
                            + ' Ряд: ' + row
                            + ' Место: ' + place
                            + ' Цена: ' + price
                            + '</h5>');
    }
    $('#choice').append('<h5>' + 'Общая стоимость билетов: ' + amount + '</h5>');
}

function setOccupiedPlacesAndSession() {
    var occupiedPlaces = [];
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const str of urlParams.values()) {
        occupiedPlaces.push(str);
    }
    var session = document.getElementById('session');
    session.setAttribute('value', occupiedPlaces.pop());
    var places = document.getElementById('cells');
    places.setAttribute('value', occupiedPlaces.toString());
}