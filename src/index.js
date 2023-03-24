import Notiflix from 'notiflix';
import debounce from "lodash.debounce";
import fetchCountries from "./fetchCounties"
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const listCountries = document.querySelector(".country-list");
const infoCountries = document.querySelector(".country-info");

let searchQuery = '';

input.addEventListener('input', debounce(inputFetch, DEBOUNCE_DELAY));

// Робота в input
function inputFetch(searchQuery) {
  console.log(input.value);
  searchQuery = input.value.trim();
  fetchCountries(searchQuery).then(countries => renderList(countries));
}
// .catch(console.error('Input error'))
// Перевірка пошуку
function renderList(countries) {
  console.log('countries:', countries);
  const inputTrim = input.value.trim();
  if(inputTrim.length > 0 && inputTrim.length < 2) {
    listCountries.innerHTML = "";
    infoCountries.innerHTML = "";
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
  }
  else if(countries.length >= 2 && countries.length < 10) {
      addListMarkup(countries);
  }
  else if(countries.status = 404 && countries.message === "Not Found") {
    Notiflix.Notify.failure("Oops, there is no country with that name")
  }
  else {
    addInfoMarkup(countries);
  }
}

// Створення розмітки
function addInfoMarkup(countries) {
    const infoCreate = countries.map(({name: {official}, flags: {svg}, capital, population, languages }) => {
      const language = Object.values(languages).join(",");
      return`
      <h1><img src="${svg}" width="40px"/><span>${official}</span></h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Language: ${language}</p>
      `;}).join('');
  
      for (const country of countries) {
          listCountries.innerHTML = infoCreate;
      }
  }

function addListMarkup(countries) {
  const listCreate = countries.map(({name: {official}, flags: {svg}}) => {
    return `
    <li class="country-list__item" style="list-style-type: none">
      <img src="${svg}" width="40px"/><span>${official}</span>
    </li>
    `;}).join('');

    listCountries.innerHTML = listCreate;
}