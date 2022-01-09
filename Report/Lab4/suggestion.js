import { words } from './dictionary.js';

const input = document.getElementById('task6');
const sugg = document.getElementById('suggestion');

let previousWord = '';

const keyUpHandler = debounce((e) => wordSuggestion(e), 250);

input.addEventListener('keyup', keyUpHandler);

(function init() {
    
    const dic = document.getElementById('dic');

    let allWords = '';

    for (let index = 0; index < words.length; index++) {

        const word = words[index];
        allWords += word;

        if (index !== words.length - 1)
            allWords += ', ';
    }

    dic.innerText = allWords;
})()

function wordSuggestion(e) {

    if (previousWord === input.value)
        return;

    if (!input.value) {
        togleSuggDisplay(false);
        previousWord = '';
        return;
    }      

    const wordsInDic = lookForWord(input.value);

    if (wordsInDic.length > 0) {
        createSuggestions(wordsInDic);
        togleSuggDisplay(true);
    }

    else togleSuggDisplay(false);

    previousWord = input.value;
}

function debounce(func, wait, immediate) {

	let timeout;

	return function() {

		let context = this, args = arguments;
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			timeout = null;

			if (!immediate)
                func.apply(context, args);
                
		}, wait);

		if (immediate && !timeout)
            func.apply(context, args);
	};
}

function createSuggestions(arr) {

    removeAllChildren(sugg);

    for (let index = 0; index < arr.length; index++) {

        const word = arr[index];
        let p = document.createElement('p');
        p.innerText = word;
        sugg.appendChild(p);
    }
}

function removeAllChildren(node) {

    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function lookForWord(input) {

    const result = [];

    for (let index = 0; index < words.length; index++) {
        
        const word = words[index];

        if (word.includes(input))
            result.push(word); 
    }

    return result;
}

function togleSuggDisplay(display) {

    if (display)
        sugg.style.display = 'block';
    
    else sugg.style.display = 'none';
}