const input = [1, 32, 2, 5, 18, 22, 33];
const output = sorting(input);

console.log('Задача 4')
console.log('Input: ' + input);
console.log('Output: ' + output);

const sorted = [...input];
quickSort(sorted, 0, input.length - 1);

console.log('Задача 6')
console.log('Input: ' + input);
console.log('Output: ' + sorted);

function sorting(arr) {

    if (!arr || !Array.isArray(arr))
        throw new Error('Not array');

    if (arr.length < 2)
        return arr;

    const divisionByTwo = [];
    const divisionByThree = [];
    const divisionByTwoAndThree = [];

    for (let index = 0; index < arr.length; index++) {

        const element = arr[index];
        
        if (element % 2 === 0 && element % 3 === 0)
            divisionByTwoAndThree.push(element);

        else if (element % 2 === 0)
            divisionByTwo.push(element);

        else if (element % 3 === 0)
            divisionByThree.push(element);
    }

    return [...divisionByTwoAndThree, ...divisionByTwo, ...divisionByThree];
}

function quickSort(arr, start, end) {

    if (start >= end)
        return;
    
    const index = partition(arr, start, end);
    
    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
}

function partition(arr, start, end) {

    const pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {

        if (arr[i] < pivotValue) {

            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
        }
    }
    
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

    return pivotIndex;
};