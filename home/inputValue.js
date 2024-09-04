

$(document).ready(function () {
    $("button[type='submit']").on("click", function () {
        let inputValue = $("#basic-url").val();
        if (inputValue) {
            window.location.href = "/scan/index.html";
        } else {
            window.alert("Por Favor, insira um link válido!");
        }


        localStorage.setItem("inputValue", inputValue);
    });
});

