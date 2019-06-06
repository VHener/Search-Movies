import React from "react";
import { Button } from 'react-bootstrap';

function SearchButton(props) {    
    return (
        <Button variant="primary" onClick={props.function} type="submit">
            Search
        </Button>
    );
}

export default SearchButton;
