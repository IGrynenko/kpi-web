const url = 'http://localhost:3010/settings';

const fonts = {
    raleway: 'Raleway',
    roboto: 'Roboto Mono',
    nautigal: 'The Nautigal',
    yanone: 'Yanone Kaffeesatz'
};

defaultSettings = {
    font: 'raleway',
    fontSize: '16',
    background: 'aliceblue'
}

let form;
let body;

document.addEventListener('DOMContentLoaded', async () => {

    form = document.getElementById('form-settings');
    body = document.getElementById('body');

    await init();
});

async function init() {

    const settings = await getSettings() ?? defaultSettings;
    useSettings(settings);
    setForm(settings);
}

async function save() {

    const settings = getSetStyles();
    useSettings(settings);
    await saveSettings(settings);
}

function getSetStyles() {
    
    if (form) {
        const formElements = form.elements;
        const font = formElements['font'].value;
        const fontSize = formElements['font-size'].value;
        const background = formElements['background-color'].value;

        return { font, fontSize, background };
    }
}

function setForm(settings) {

    if (form && settings) {

        const formElements = form.elements;
        formElements['font'].value = settings.font;
        formElements['font-size'].value = settings.fontSize;
        formElements['background-color'].value = settings.background;
    }
}

async function saveSettings(settings) {

    if (settings) {

        await postRequest({
            font: settings.font,
            fontSize: settings.fontSize,
            background: settings.background
        });
    }
}

async function getSettings() {

    const response = await getRequest();

    if (response.ok) {
        const json = response.json();
        return json;
    }
    else {
        console.log('Error get');
    }
}

function useSettings(settings) {

    body.style.fontSize = `${settings.fontSize}px`;
    body.style.fontFamily = `${fonts[settings.font]}, sans-serif`;
    body.style.background = settings.background;
}

function getRequest() {

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function postRequest(settings) {

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
    });
}