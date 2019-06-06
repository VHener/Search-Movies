import React from "react";
import PropTypes from "prop-types";

import MovieValueTotal from "./MovieValueTotal";

function MoviesTotal(props) {
  return (
    <div>
      <MovieValueTotal key={props.total} total={props.total} />
    </div>
  );
}

MoviesTotal.propTypes = {
  total: PropTypes.number.isRequired
};

export default MoviesTotal;
