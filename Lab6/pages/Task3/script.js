$(function() {
    $("#accordion").accordion();
});

$(function() {
    $("#datepicker").datepicker();
});

$(function() {
    $("#menu").menu();
});

$(function() {
    $("#slider").slider();
});

$(function() {
    $("#tabs").tabs();
});

$(function() {
    $(document).tooltip();
});

function test(event) {
    event.preventDefault();
    const elements = document.getElementById('hello-form').elements;
    let value = elements[0].value;

    if (value) {
        fetch('http://localhost:3010/form', {
            method: 'POST',
            body: JSON.stringify({ 'input': value }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res) {

                const date = new Date(res.date);
                console.log(date);
            }
        })
    }
}