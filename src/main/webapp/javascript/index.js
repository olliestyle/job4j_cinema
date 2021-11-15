"use strict";
var contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));

function executeQuery() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/job4j_cinema/hall.do' + '?session=' + document.getElementById('movieSession').getAttribute('data-value'),
        dataType: 'json',
        success: function(data) {
            var checkBoxes = document.getElementsByName("cell");
            for (var box of checkBoxes) {
                box.disabled = false;
            }
            for (var cell of data) {
                document.getElementById("row" + cell.row + "place" + cell.place).disabled = true;
            }
        }
    });
    setTimeout(executeQuery, 10000);
}

$(document).ready(function() {
    executeQuery();
});

function validateIndex() {
    return getCheckedBoxes().length > 0;
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