import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from 'react-bootstrap';
function Movie(props) {
  return (
    <ListGroup>
      <ListGroup.Item variant="primary">Year: {props.year} - Quantity: {props.movies}</ListGroup.Item>
    </ListGroup>
  );
}

Movie.propTypes = {
  year: PropTypes.number.isRequired,
  movies: PropTypes.number.isRequired
};

export default Movie;
