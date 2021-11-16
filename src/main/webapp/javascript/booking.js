"use strict";
var contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));

function executeQuery() {
    $.ajax({
        type: 'GET',
        url: 'http://192.168.0.106:8080/job4j_cinema/hall.do' + '?session=' + document.getElementById('movieSession').getAttribute('data-value'),
        dataType: 'json',
        success: function(data) {
            var checkBoxes = document.getElementsByName("cell");
            for (var box of checkBoxes) {
                box.disabled = false;
            }
            for (var cell of data) {
                document.getElementById("row" + cell.row + "place" + cell.place).disabled = true;
                document.getElementById("row" + cell.row + "place" + cell.place).className = 'occupied';
            }
        }
    });
    setTimeout(executeQuery, 10000);
}

$(document).ready(function() {
    const queryString = window.location.search;
    const session = new URLSearchParams(queryString).get('session');
    document.getElementById("movieSession").setAttribute("data-value", session)
    executeQuery();
});

function fillGrid() {
    for (let i = 1; i < 6; i++) {
        for (let j = 1; j < 6; j++) {
            $('#gridFiller').append(
                "<div class=\"box\">\n"
                + "<label class=\"check\">\n"
                + "<input type=\"checkbox\" name=\"cell\" value=\"" + i * 100 + "\"" + " data-row=\"" + i + "\" data-place=\"" + j + "\" id=\"row" + i + "place" + j + "\">\n" +
                "<span>Ряд " + i + " Место " + j + "</span>\n" +
                "</label>\n" +
                "</div>"
            );
        }
    }
}

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