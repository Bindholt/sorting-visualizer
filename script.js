window.addEventListener("load", start);

let array = [5,4,3,2];
let arrayLength = 20;
let isSorting = false;

function start() {
    console.log("start");
    attachEventListeners();
}

function createArray() {
    array = [];
    for (let i = 0; i < arrayLength; i++) {
        const number = Math.ceil(Math.random() * arrayLength)
        
        array.push(number);
    }
}

/* --------------- ALGORITHMS ----------------- */
/* GNOME SORT */
async function gnomeSort() {
    let i = 0;
    while (i < array.length) {
        highlightVisualBar(i);
        if(i == 0 || array[i] >= array[i-1]) {
            i++;
            await sleep(50);
        } else {
            swap(array, i, i-1);
            swapVisualBars(i);
            i--;
            highlightVisualBar(i);
            await sleep(50);
        }
    }
}

/* BUBBLE SORT */
async function bubbleSort() {
    let swapped = false;

    for (let i = 1; i < arrayLength; i++) {
        highlightVisualBar(i);
        if(array[i-1] > array[i]) {
            swap(array, i, i-1);
            swapVisualBars(i);
            swapped = true;
        } 
        await sleep(50);
    }

    if(swapped) {
        isSorting = true;
        bubbleSort();
    } else {
        isSorting = false;
        toggleSortingButtons();
    }

}

/* --------------- HELPERS ----------------- */

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    
    return array;
}

/* --------------- VIEW ------------------ */
function attachEventListeners() {
    document.querySelector("#create-array-btn").addEventListener("click", () => {
        createArray();
        createVisualBars();
    });
    document.querySelector("#gnome-sort-btn").addEventListener("click", async () => {
        isSorting = true;
        toggleSortingButtons();
        await gnomeSort();
        isSorting = false;
        toggleSortingButtons();
        

    });
    document.querySelector("#bubble-sort-btn").addEventListener("click", async () => {
        await bubbleSort();
        //todo: få isSorting + toggleSortingButtons ud af bubleSort
    });
}

function createVisualBars() {
    const container = document.querySelector("#container");
    container.innerHTML = "";
    
    array.forEach((number) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${number * 10}px`;
        container.appendChild(bar);
    });

    toggleSortingButtons();
}

function toggleSortingButtons() {
    document.querySelector("#create-array-btn").disabled = isSorting;
    document.querySelector("#gnome-sort-btn").disabled = isSorting;
    document.querySelector("#bubble-sort-btn").disabled = isSorting;
    
}

let lastHighlight;
function highlightVisualBar(i){
    const bars = document.querySelectorAll(".bar");

    if(lastHighlight && bars[i]) lastHighlight.classList.remove("highlighted");
    bars[i].classList.add("highlighted");
    lastHighlight = bars[i];
}

function swapVisualBars(i) {
    const bars = document.querySelectorAll(".bar");
    if(i > 0) {
        bars[i-1].style.height = `${array[i-1] * 10}px`
    }
    bars[i].style.height = `${array[i] * 10}px`
}