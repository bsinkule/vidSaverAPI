const form = document.querySelector('form');
const ul = document.querySelector('#list');
const button = document.querySelector('#clear');
const input = document.getElementById('item');
const button2 = document.querySelector('#push');
const vids = './data.json';

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
    const li = document.createElement('li');
    li.classList.add('as');
    li.classList.add('if');
    const vid = document.createElement('iframe');
    vid.classList.add('bonk');

    if (text.indexOf('m.') !== -1) {
        text = text.replace('m.', '')
    }
    let cow = 'www.youtube.com/watch?v='
    let it = 'youtu.be/'
    if (text.indexOf(it) !== -1) {
        text = text.replace(it, cow)
    }
    let time = /([\?|&]t=[a-z0-9]+)/
    if (text.indexOf('t=') !== -1) {
        let comb = text.match(time)[0]
        text = text.replace(comb, '')
    }

    text = text.replace('watch?v=', 'embed/');
    vid.src = text;
    vid.setAttribute('allowFullScreen', '')
    li.appendChild(vid);
    ul.insertBefore(li, ul.childNodes[0]);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    itemsArray.push(input.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    liMaker(input.value);
    input.value = "";
});

data.forEach(item => {
    liMaker(item);
});

button2.addEventListener('click', function (e) {
    e.preventDefault()

    const liMaker2 = (text) => {
        const li = document.createElement('li');
        li.classList.add('as');
        li.classList.add('if');
        const vid = document.createElement('iframe');
        vid.classList.add('bonk');

        vid.src = text;
        vid.setAttribute('allowFullScreen', '')
        li.appendChild(vid);
        ul.insertBefore(li, ul.childNodes[0]);
    }

    function getVids(url) {
        fetch(url)
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                liMaker2(data[Math.floor(data.length * Math.random())].link)
            })
    }
    getVids(vids)

})

button.addEventListener('click', function () {
    localStorage.clear();
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
});

var storageInfo = null;

if (navigator.webkitTemporaryStorage) {
    storageInfo = navigator.webkitTemporaryStorage;
} else if (navigator.webkitPersistentStorage) {
    storageInfo = navigator.webkitPersistentStorage;
} else if (window.webkitStorageInfo) {
    storageInfo = window.webkitStorageInfo;
}