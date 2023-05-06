const search = document.querySelector('input')
const form = document.querySelector('form')
const submitBtn = document.querySelector('#submit-btn')
const main = document.querySelector('main')
let latestAdded

submitBtn.addEventListener('click', function (e) {
  e.preventDefault()
  const searchValue = search.value
  search.value = ''
  if (latestAdded) {
    main.removeChild(latestAdded)
  }
  fetchMoveis(searchValue).then(async function (val) {
    console.log(val)
    const moviesContainer = document.createElement('div')
    moviesContainer.classList.add('movies-container')
    main.appendChild(moviesContainer)
    latestAdded = moviesContainer

    for (movie of val.data) {
      await delayedMovieAppend(movie, moviesContainer, 100)
    }
  })
})

function fetchMoveis(query) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then(function (res) {
        resolve(res)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

async function delayedMovieAppend(movie, container, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movieElement = document.createElement('div')
      const movieImg = document.createElement('img')
      const movieTitle = document.createElement('h3')
      const movieRating = document.createElement('p')
      const movieInfo = document.createElement('div')

      movieElement.classList.add('movie', 'new-movie')
      movieImg.classList.add('movie-img')
      movieTitle.classList.add('movie-title')
      movieRating.classList.add('movie-rating')
      movieInfo.classList.add('movie-info')

      movieImg.alt = 'movie-img'
      movieImg.src = movie.show.image
        ? movie.show.image.medium
        : './img/no-img.jpg'
      movieTitle.innerText = movie.show.name
      movieRating.innerText = movie.show.rating.average
        ? movie.show.rating.average
        : 'No Rating Yet'

      movieElement.appendChild(movieImg)
      movieInfo.appendChild(movieTitle)
      movieInfo.appendChild(movieRating)
      movieElement.appendChild(movieInfo)
      container.appendChild(movieElement)
      resolve()
    }, delay)
  })
}
