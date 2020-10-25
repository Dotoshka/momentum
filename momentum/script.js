//Months and Days of week
const months = month = ["January", "February", "March", "April", "May", "June", "July",
                        "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//DOM Elements
const dateToday = document.getElementById('date-today');
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const blockquote = document.querySelector('blockquote');
const changeQuoteBtn = document.querySelector('#change-quote');
const city = document.querySelector('.city');
const invalidInput = document.querySelector('.invalid-input');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feels-like');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const changeBgBtn = document.getElementById('change-bg');
let bgArr = getBgArray();

//Event listeners
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', editText);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', editText);
changeBgBtn.addEventListener('click', changeBg);
changeQuoteBtn.addEventListener('click', getQuote);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', editText);

//Run

document.addEventListener('DOMContentLoaded', () => {
    getWeather();
})

showTime();
setGreet();
setBg();
getName();
getFocus();
getQuote();


//ADD Zeros
function addZero(number) {
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

//Show time
function showTime() {
    let today = new Date();
    let dayOfWeek = today.getDay();
    let day = today.getDate();
    let month = today.getMonth();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    
    //Output date and time
    dateToday.innerHTML = `${daysOfWeek[dayOfWeek]}, ${day} ${months[month]}`;
    time.innerHTML = `${addZero(hour)}<span class="separator">:</span>${addZero(min)}<span class="separator">:</span>${addZero(sec)}`;

    if (min == 00 && sec == 00) {
        setGreet();
        setBg()
        getWeather();
    }

    setTimeout(showTime, 1000);
}

//Edit Name, Focus or City
function editText(e) {
    e.target.innerText = '';
}

//Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

//Set Name
function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText.trim() !== '') {
                localStorage.setItem('name', e.target.innerText.trim());
                getName();
            } else {
                getName();
            }
            name.blur();
        }
    } else {
        if (e.target.innerText.trim() !== '') {
            localStorage.setItem('name', e.target.innerText.trim());
            getName();
        } else {
            getName();
        }
    }
}

//Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

//Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText.trim() !== '') {
                localStorage.setItem('focus', e.target.innerText.trim());
                getFocus();
            } else {
                getFocus();
            }
            focus.blur();
        }
    } else {
        if (e.target.innerText.trim() !== '') {
            localStorage.setItem('focus', e.target.innerText.trim());
            getFocus();
        } else {
            getFocus();
        }
    }
}

//Get quote
async function getQuote() {
    const url = `https://catfact.ninja/fact?max_length=140`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.fact;
}

//Get Weather
async function getWeather() {

    if (localStorage.getItem('city') === null) {
        city.textContent = '[Enter City]';
    } else {
        city.textContent = localStorage.getItem('city');
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=d1d1319765c55b9da36bc725b7c79f45&units=metric`;
        if ((await fetch(url)).ok == true) {
            const res = await fetch(url);
            const data = await res.json();
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind: ${data.wind.speed} m/s`;
            feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)}°`;
            invalidInput.style.display = 'none';
        } else {
            invalidInput.style.display = 'initial'
            temperature.textContent = '';
            humidity.textContent = '';
            windSpeed.textContent = '';
            feelsLike.textContent = '';
            weatherIcon.className = 'weather-icon owf';
        }
    }
}

//Set city
function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText.trim() !== '') {
                localStorage.setItem('city', e.target.innerText.trim());
                getWeather();
            } else {
                getWeather();
            }
            city.blur();
        }
    } else {
        if (e.target.innerText.trim() !== '') {
            localStorage.setItem('city', e.target.innerText.trim());
            getWeather();
        } else {
            getWeather();
        }
    }
}

// Get random integer (from 1)
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1);
}

// Get background images array
function getBgArray() {
    const base = "assets/images"
    let bgArr = [];
    let i = 0;

    while (i < 6) { 
        let imgNumber = `${base}/night/${addZero(getRandomInt(20))}.jpg`;
        if (!bgArr.slice(0, i).includes(imgNumber)) {
        bgArr.push(imgNumber);
        i++    
        }
    }

    while (i < 12) {
        let imgNumber = `${base}/morning/${addZero(getRandomInt(20))}.jpg`;
        if (!bgArr.slice(6, i).includes(imgNumber)) {
        bgArr.push(imgNumber);
        i++    
        }
    }

    while (i < 18) {
        let imgNumber = `${base}/day/${addZero(getRandomInt(20))}.jpg`;
        if (!bgArr.slice(12, i).includes(imgNumber)) {
        bgArr.push(imgNumber);
        i++    
        }
    }

    while (i < 24) {
        let imgNumber = `${base}/evening/${addZero(getRandomInt(20))}.jpg`;
        if (!bgArr.slice(18, i).includes(imgNumber)) {
        bgArr.push(imgNumber);
        i++    
        }
    }

    return bgArr;
}

//Set Background and Greeting
function setGreet() {
    let today = new Date();
    let hour = today.getHours();
    if (hour >= 6 && hour < 12) {
        //Morning
        greeting.textContent = 'Good Morning,'
    } else if (hour >= 12 && hour < 18) {
        //Afternoon
        greeting.textContent = 'Good Afternoon,'
    } else if (hour >= 18 && hour < 24) {
        //Evening
        greeting.textContent = `Good Evening,`
    } else {
        //Night
        greeting.textContent = 'Good Night,'
    }
}

function setBg() {
    let today = new Date();
    let hour = today.getHours();
    const src = bgArr[hour];
    //console.log(src);
    const img = document.createElement('img');
    //console.log(img);
    img.src = src;
    //console.log(img.src);
    img.onload = () => {
        document.body.style.backgroundImage = `url(${src})`;
    };
}

//Change background
function changeBg() {
    let bgImg = document.body.style.backgroundImage.slice(4,-1).replace(/"/g, "");
    let curBgIndex = bgArr.indexOf(bgImg);
    let newBgIndex = 0;
    curBgIndex == 23 ? newBgIndex : newBgIndex = curBgIndex + 1;
    const src = bgArr[newBgIndex];
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        document.body.style.backgroundImage = `url(${src})`;
    };
}