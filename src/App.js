import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap';

import axios from "axios";

import MoviesList from "./components/MoviesList";
import MoviesTotal from "./components/MoviesTotal";
import SearchButton from "./components/SearchButton";

class App extends Component {

  initialState = {
    movies: [],
    total: 0
  };

  constructor(props) {

    super(props);

    this.state = this.initialState;

    this.searchMovies = this.searchMovies.bind(this);
  }

  resetStat() {
    this.setState(this.initialState);
  }


  searchMovies(e) {
    e.preventDefault();

    const searchMovieItem = document.getElementById("searchInput").value;

    this.resetStat();

    if (searchMovieItem !== "") {
      axios
        .get("https://us-central1-storando-ceac6.cloudfunctions.net/api/movies/select/" + searchMovieItem)
        .then(response => {
          const newMovies = response.data.moviesByYear.map(c => {
            return {
              year: c.year,
              movies: c.movies
            };
          });

          const newState = Object.assign({}, this.state, {
            movies: newMovies,
            total: response.data.total
          });

          this.setState(newState);
        })
        .catch(error => console.log(error));
    } else {
      this.resetStat();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Search Movies</h1>

          <Form className="form">
            <Form.Group>
              <Row>
                <Col md={9}>
                  <InputGroup>
                    <FormControl
                      id="searchInput"
                      placeholder="Please Enter a Movie Title"
                    />
                  </InputGroup>
                </Col>
                <Col md={{ span: 2, offset: 0 }}>
                  <SearchButton function={this.searchMovies.bind(this)} />
                </Col>
              </Row>
            </Form.Group>
          </Form>

          {this.state.total ? (
            <MoviesTotal total={this.state.total} />
          ) : (
              null
            )
          }

          <MoviesList movies={this.state.movies} />
        </header>

      </div>
    );
  }
}

export default App;
