import { getAllPrograms, getProgram, createProgram } from './lab7.js';

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
    document.getElementById('get-all-btn').addEventListener('click', (event) => showAllPrograms());
    document.getElementById('get-specific-btn').addEventListener('click', (event) => showProgram());
    document.getElementById('add-program-btn').addEventListener('click', (event) => addProgram(event));
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

async function showProgram() {

    const id = document.getElementById('get-title');

    if (id && id.value) {

        const result = await getProgram(id.value);
        
        if (result) {
            
            if (result.ok) {

                const program = await result.json();
                
                if (program) {

                    const tv = document.getElementById('specific-tv-program');
                    removeNodeChild(tv);
                    tv.appendChild(createProgramsTable(program));
                }
            }
            else {
                console.log(result.statusText);
            }
        }
    }
}

async function showAllPrograms() {

    const result = await getAllPrograms();

    if (result && result.ok) {

        const programs = await result.json();

        if (programs && programs.length > 0) {

            const tv = document.getElementById('all-tv-programs');
            removeNodeChild(tv);
            tv.appendChild(createProgramsTable(programs));
        }
    }
}

function createProgramsTable(programs) {

    const table = document.createElement('table');

    const header = document.createElement('tr');
    createTableItem(header, 'Id');
    createTableItem(header, 'Title');
    table.appendChild(header);

    programs.forEach(p => {

        const tr = document.createElement('tr');
        createTableItem(tr, p.Id);
        createTableItem(tr, p.Title);
        table.appendChild(tr);
    });

    return table;
}

function createTableItem(parentNode, text) {

    const td = document.createElement('td');
    td.innerText = text;
    parentNode.appendChild(td);
}

function removeNodeChild(node) {
    node.innerHTML = '';
}

async function addProgram(event) {

    event.preventDefault();
    const form = document.getElementById('submit-form');

    if (form) {

        const title = form.elements[0]?.value;
        const descr = form.elements[1]?.value;
        const genre = form.elements[2]?.value;
        const audience = form.elements[3]?.value;
        const language = form.elements[4]?.value;
        const duration = form.elements[5]?.value;

        if (title, descr, genre, audience, language, duration) {

            const result = await createProgram(title, descr, genre, audience, language, duration);

            if (result) {
                console.log(result.statusText);
            }
        }
    }
}