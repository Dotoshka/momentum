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

//Show time
function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    let dayOfWeek = today.getDay();
    let day = today.getDate();
    let month = today.getMonth();


    //Output time
    dateToday.innerHTML = `${day} ${months[month]}, ${daysOfWeek[dayOfWeek]}`;
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);
}

//ADD Zeros

function addZero(number) {
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
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

//Edit Name or Focus
function editText(e) {
    // e.target.setAttribute('contenteditable', 'true');
    e.target.innerText = '';
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

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('focus', editText);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', editText);

//Get quote

const blockquote = document.querySelector('blockquote');
const btn = document.querySelector('.btn');

async function getQuote() {
    const url = `https://catfact.ninja/fact?max_length=140`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.fact;
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

//Get Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const invalidInput = document.querySelector('.invalid-input');

async function getWeather() {

    if (localStorage.getItem('city') === null) {
        city.textContent = '[Enter City]';
    } else {
        city.textContent = localStorage.getItem('city');
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=d1d1319765c55b9da36bc725b7c79f45&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.name);
        if (data.name === undefined) {
            console.log('Issue');
            //localStorage.setItem('city', '[Enter Correct City]');
            //city.textContent = '[Enter Correct City]';
            invalidInput.style.display = 'initial'
            temperature.textContent = '';
            humidity.textContent = '';
            windSpeed.textContent = '';
            weatherDescription.textContent = '';
            weatherIcon.className = 'weather-icon owf';
        } else {
            console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${data.main.temp}°C`;
            humidity.textContent = `${data.main.humidity}%`;
            windSpeed.textContent = `${data.wind.speed}m/s`;
            weatherDescription.textContent = data.weather[0].description;
            invalidInput.style.display = 'none';
        }
    }

}

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

city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', editText);

// Get random integer (from 1)

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1);
}


// Get background images array


function getBgArray() {
    let bgArr = [];
    let i = 0;
    //let imgNumber = 0;

    while (i < 6) { 
        //console.log(i);
        let imgNumber = `/night/${addZero(getRandomInt(20))}.jpg`;
        if (!bgArr.slice(0, i).includes(imgNumber)) {
        bgArr.push(imgNumber);
        i++    
        }
    }

    while (i < 12) {
        let imgNumber = `/morning/${addZero(getRandomInt(20))}.jpg`;
        if (!bgArr.slice(6, i).includes(imgNumber)) {
        bgArr.push(imgNumber);
        i++    
        }
    }

    while (i < 18) {
        let imgNumber = `/day/${addZero(getRandomInt(20))}.jpg`;
        if (!bgArr.slice(12, i).includes(imgNumber)) {
        bgArr.push(imgNumber);
        i++    
        }
    }

    while (i < 24) {
        let imgNumber = `/evening/${addZero(getRandomInt(20))}.jpg`;
        if (!bgArr.slice(18, i).includes(imgNumber)) {
        bgArr.push(imgNumber);
        i++    
        }
    }

    console.log(bgArr)
    return bgArr;
}

let bgArr = getBgArray();

//Set Background and Greeting

function SetBgGreet() {
    let today = new Date();
    let hour = today.getHours();

    if (hour >= 6 && hour < 12) {
        //Morning
        document.body.style.backgroundImage = `url('./assets/images${bgArr[hour]}')`;
        greeting.textContent = 'Good Morning,'
    } else if (hour >= 12 && hour < 18) {
        //Afternoon
        document.body.style.backgroundImage = `url('./assets/images${bgArr[hour]}')`;
        greeting.textContent = 'Good Afternoon,'

    } else if (hour >= 18 && hour < 24) {
        //Evening
        document.body.style.backgroundImage = `url('./assets/images${bgArr[hour]}')`;
        greeting.textContent = 'Good Evening,'

    } else {
        //Night
        document.body.style.backgroundImage = `url('./assets/images${bgArr[hour]}')`;
        greeting.textContent = 'Good Night,'
        document.body.style.color = 'white'
    }
}

const changeBgBtn = document.getElementById('bg');
changeBgBtn.addEventListener('click', changeBg);

//change background
function changeBg() {
    let bgImg = document.body.style.backgroundImage.match(/\/\w+\/\d+.jpg/)[0];
    let curBgIndex = bgArr.indexOf(bgImg);
    let newBgIndex = 0;
    curBgIndex == 23 ? newBgIndex : newBgIndex = curBgIndex + 1;
    document.body.style.backgroundImage = `url('./assets/images${bgArr[newBgIndex]}')`;
    console.log(bgImg);
    console.log(newBgIndex);
}

//Run
showTime();
SetBgGreet();
getName();
getFocus();
getWeather();

//document.addEventListener('DOMContentLoaded', getWeather);