const API_TOKEN = 'f14da520e67fc67c2963fa0262f3b873'
const API_BASE_URL = 'https://api.themoviedb.org/3/'

export function getFilmsFromApiWithSearchedText(text, page) {
  let url = API_BASE_URL + 'search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getFilmDetailFromApi (id) {
  let url = API_BASE_URL + 'movie/'+ id + '?api_key=' + API_TOKEN + '&language=fr'
  return fetch (url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}
