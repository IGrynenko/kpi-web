const url = 'http://localhost:3010/settings';

let form;
let body;

document.addEventListener('DOMContentLoaded', () => {

    form = document.getElementById('form-settings');
    body = document.getElementById('body');
});

async function test() {
    
    if (form) {
        const settings = form.elements;
        const font = settings['font'].value;
        const fontSize = settings['font-size'].value;
        const background = settings['background-color'].value;

        console.log(font)
        console.log(fontSize)
        console.log(background)

        const a = await getSettings();
        console.log(a);
        useSettings();
    }
}

async function getSettings() {

    const response = await getRequest();

    if (response.ok) {
        const json = response.json();
        return json;
    }
    else {
        console.log('Error');
    }
}

function useSettings(settings) {
    body.style.fontSize = '30px';
    console.log(body.style)
}

function getRequest() {

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
}

function postRequest(body) {

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: body
    });
}