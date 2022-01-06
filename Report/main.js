let displayedContentBlock;
let screenHeight;

(function(window, document, undefined){
    
    window.onload = init;
    
    function init(){

        screenHeight = document.documentElement.clientHeight - 10;
        displayedContentBlock = document.getElementById('lab1');
        displayedContentBlock.style.height = getContentBlockHeight();
        initButtonEvents();
    }
    
})(window, document, undefined);

function initButtonEvents() {
    
    document.getElementById('lab1-btn').addEventListener('click', (event) => btnClickHandler(event, 'lab1'));
    document.getElementById('lab2-btn').addEventListener('click', (event) => btnClickHandler(event, 'lab2'));
    document.getElementById('lab3-btn').addEventListener('click', (event) => btnClickHandler(event, 'lab3'));
    document.getElementById('lab4-btn').addEventListener('click', (event) => btnClickHandler(event, 'lab4'));
    document.getElementById('lab5-btn').addEventListener('click', (event) => btnClickHandler(event, 'lab5'));
    document.getElementById('lab6-btn').addEventListener('click', (event) => btnClickHandler(event, 'lab6'));
    document.getElementById('lab7-btn').addEventListener('click', (event) => btnClickHandler(event, 'lab7'));
    document.getElementById('lab8-btn').addEventListener('click', (event) => btnClickHandler(event, 'lab8'));
    document.getElementById('lab9-btn').addEventListener('click', (event) => btnClickHandler(event, 'lab9'));
}

function btnClickHandler(e, elementId) {

    const element = document.getElementById(elementId);

    displayedContentBlock.style.display = 'none';
    element.style.display = 'flex';
    element.style.height = getContentBlockHeight();
    displayedContentBlock = element;
}

function getContentBlockHeight() {

    const headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
    return `${screenHeight - headerHeight}px`;
}