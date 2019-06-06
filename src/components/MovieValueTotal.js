import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from 'react-bootstrap';
import './Movie.css';

function MovieValueTotal(props) {
    return (
        <div className="movie">
            <ListGroup>
                <ListGroup.Item variant="primary">Total Movies: {props.total}</ListGroup.Item>
            </ListGroup>
        </div>
    );
}

MovieValueTotal.propTypes = {
    total: PropTypes.number.isRequired
};

export default MovieValueTotal;
