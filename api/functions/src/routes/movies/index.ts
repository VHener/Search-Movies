const express = require('express');
const routerMovies = express.Router();
const request = require('request');
const Q = require("q");
const hostname = 'https://jsonmock.hackerrank.com/api/movies/search/?';
const pathTitle = 'Title=';
const pathPages = '&page=';

routerMovies.get('/select/:movie', async function (req, res, next) {

  let movieParam = req.params.movie;

  let firstMovie = true;
  let moviesHeader: any = {};
  let moviesPerPages: any = [];
  const promises: any = [];
  let moviesCountPages: number = 0;

  let moviesByYear: any = {
    moviesByYear: [
      {
        year: 0,
        movies: 0
      }
    ],
    total: 0
  }

  promises.push(movies(moviesHeader, movieParam));

  Q.all(promises).then(() => {
    moviesCountPages = moviesHeader.movies.total_pages;

    for (let numberPage = 1; numberPage <= moviesCountPages; numberPage++) {
      promises.push(moviesByPages(moviesPerPages, movieParam, numberPage));
    }

    Q.all(promises).then(() => {
      moviesPerPages.forEach(elementMoviesPages => {

        elementMoviesPages.data.forEach(elementMovieInfo => {

          moviesByYear.total += 1;

          if (firstMovie) {
            moviesByYear.moviesByYear[0].year = elementMovieInfo.Year;
            moviesByYear.moviesByYear[0].movies = 1;
            firstMovie = false;
          } else {
            let index = moviesByYear.moviesByYear.findIndex(value => value.year == elementMovieInfo.Year);
            if (index < 0) {
              moviesByYear.moviesByYear.push({ year: elementMovieInfo.Year, movies: 1 })
            } else {
              moviesByYear.moviesByYear[index].movies += 1;
            }
          }
        });
      });

      return res.status(200).send(moviesByYear);
    }).catch(errPromise => {
      return res.status(500).send(errPromise);
    });


  }).catch(errPromise => {
    return res.status(500).send(errPromise);
  });

});

const movies = (moviesHeader, title) => {
  const deferred = Q.defer();

  request(`${hostname}${pathTitle}${title}`, (err, res, body) => {
    if (err) {
      deferred.reject(err);
    } else {
      moviesHeader['movies'] = JSON.parse(body);
      deferred.resolve()
    }
  });

  return deferred.promise;
}

const moviesByPages = (moviesPerPages, title, page) => {
  const deferred = Q.defer();

  request(`${hostname}${pathTitle}${title}${pathPages}${page}`, (err, res, body) => {
    if (err) {
      deferred.reject(err);
    } else {
      moviesPerPages.push(JSON.parse(body));
      deferred.resolve()
    }
  });

  return deferred.promise;
}
export default routerMovies;