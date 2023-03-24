import Notiflix from 'notiflix';
export default function fetchCountries(searchQuery) {
  // const queryParams = '';
  return fetch(`https://restcountries.com/v3.1/name/${searchQuery}?fields=name,capital,population,flags,languages`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  // .then((response) => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // })
  // .catch((error) => console.error(error));

  // .then((response) => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json()}).catch(Notiflix.Notify.failure('Error fetch!'));
}