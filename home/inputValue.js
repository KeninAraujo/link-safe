

$(document).ready(function () {
    $("button[type='submit']").on("click", function () {
        let inputValue = $("#basic-url").val();
        console.log("Valor do input:", inputValue);
    });
});

export function getInputValue() {
    return inputValue;
}
