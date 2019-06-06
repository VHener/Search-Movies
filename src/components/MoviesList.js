import React from "react";
import PropTypes from "prop-types";
import Movie from "./Movie";

function MoviesList(props) {
  return (
    <div>{props.movies.map(
      movieResult =>
        <Movie key={movieResult.year} movies={movieResult.movies} year={movieResult.year} />
    )}
    </div>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MoviesList;
