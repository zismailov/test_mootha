import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { render } from 'react-dom';
import {Router, Route} from 'react-router';
import Pagination from "react-js-pagination";


class Movies extends Component {
  constructor(props){
      super(props)
      this.state = {
          movies: [],
          response: {},
          keyword: '',
      }
      this.handleSearch = this.handleSearch.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    let queryParamsString = this.props.location.search.substring(1)
    let searchParams = new URLSearchParams( queryParamsString );
    let keyword = searchParams.get("keyword") || ''
    let headers = { 'Authorization': `Bearer ${localStorage.getItem("user_jti")}` }
    
    axios.get('http://localhost:3001/v1/movies?keyword=' +keyword)
    .then(response => {
        this.setState({
            movies: response.data.results,
            response: response.data,
            keyword: keyword
        })
    })
    .catch(error => console.log(error))
  }

  handleSearch(event) {
    event.preventDefault();
    let keyword = document.getElementsByName('keyword')[0].value
    axios.get('http://localhost:3001/v1/movies?keyword=' +keyword)
    .then(response => {
        this.setState({
            movies: response.data.results,
            response: response.data,
            keyword: keyword
        })
        window.history.pushState(null, '', '?keyword=' +keyword)
    })
    .catch(error => console.log(error))
  }

  handlePageChange(page) {
    let keyword = this.state.keyword
    axios.get("http://localhost:3001/v1/movies?keyword="+keyword+"&page="+page)
    .then(response => {
        this.setState({
            movies: response.data.results,
            response: response.data,
            keyword: keyword
        })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
        <div className="container">
          <div className="container_wrap">
            <div className="content">
              <h2 className="m_3">Search results</h2>
              <div className="search">
                <form onSubmit={this.handleSearch}>
                  <input name="keyword" type="text" placeholder="Search..." defaultValue={this.props.match.params.keyword} required/>
                  <input type="submit" value=""/>
                </form>
              </div>
              <div className='clearfix'></div>
              <div className="movie_top">
                <div className="col-md-12 movie_box">
                  {this.state.movies &&
                    this.state.movies.map((movie, index) => {
                      return <div className="movie movie-test movie-test-dark movie-test-left" key={index}>
                        <div className="movie__images">
                          <a href={"http://localhost:3000/movies/" +movie.id } className="movie-beta__link">
                            { movie.poster_path != null &&
                              <img src={"https://image.tmdb.org/t/p/w185_and_h278_bestv2/"+ movie.poster_path} className="img-responsive" alt=""/>
                            }
                            { movie.poster_path == null &&
                              <img src='https://via.placeholder.com/185x278' className="img-responsive" alt=""/>
                            }
                          </a>
                        </div>
                        <div className="movie__info">
                          <a href={"http://localhost:3000/movies/" +movie.id } className="movie__title">{movie.title} </a>
                          <p className="movie__time">{movie.release_date}</p>
                          <br/>
                          <p className="movie__option">{movie.overview}</p>
                          <ul className="list_6">
                            <li>Rating : &nbsp;&nbsp;
                              <p>{movie.vote_average}</p>
                            </li>
                            <div className="clearfix"> </div>
                          </ul>
                        </div>
                        <div className="clearfix"> </div>
                      </div>
                    })
                }
                  <div className="clearfix"> </div>
                </div>
              </div>
              <div className="clearfix"> </div>
              {this.state.movies && 
                <Pagination
                  activePage={this.state.response.page}
                  itemsCountPerPage={20}
                  totalItemsCount={this.state.response.total_results}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  getPageUrl={(i) => `http://localhost:3001/v1/movies?keyword=${this.state.keyword}&page=${i}`}
                />
              }
              { !this.state.movies &&
                <div>
                <h1>Welcome to movie store, Please type something in the search bar</h1>
              </div>
              }
            </div>
          </div>
        </div>
    );
  }
}
 export default Movies