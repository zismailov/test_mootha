import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header';

class Movie extends Component {
  constructor(props){
      super(props)
      this.state = {
        movieDetails: [],
        movieCreditsCrew: [],
        movieCreditsCast: [],
        loading: true
      }
  }

  componentDidMount() {
    axios
      .all([
        axios.get('http://localhost:3001/v1/movies/'+this.props.match.params.id),
        axios.get('http://localhost:3001/v1/credits/'+this.props.match.params.id)
      ])
      .then(
        axios.spread((movieDetails, movieCredits) => {
          this.setState({
            movieDetails: movieDetails.data,
            movieCreditsCrew: movieCredits.data.crew[0],
            movieCreditsCast: movieCredits.data.cast,
            loading: false
          });
        })
      )
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="container">
          { this.state.movieDetails &&
            <div className="container_wrap">
              <Header/>
              { this.state.loading ? (
                <div>Loading...</div>
              ) : (
                <div className="content">
                  <div className="movie_top">
                    <div className="col-md-9 movie_box">
                      <div className="grid images_3_of_2">
                        <div className="movie_image">
                          <span className="movie_rating">{this.state.movieDetails.vote_average}</span>
                          <img src={"https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + this.state.movieDetails.poster_path} className="img-responsive" alt=""/>
                        </div>
                      </div>
                      <div className="desc1 span_3_of_2">
                        <p className="movie_option"><strong>Title: </strong>{this.state.movieDetails.title}</p>
                        <p className="movie_option"><strong>Popularity: </strong>{this.state.movieDetails.popularity}</p>
                        <p className="movie_option"><strong>Release date: </strong>{this.state.movieDetails.release_date}</p>
                        <p className="movie_option"><strong>Status: </strong><a href="#">{this.state.movieDetails.status}</a></p>
                        <p className="movie_option"><strong>Budget: </strong>{this.state.movieDetails.budget}</p>
                        <p className="movie_option"><strong>Language </strong>{this.state.movieDetails.original_language}</p> 
                        <p className="movie_option"><strong>Director </strong>{this.state.movieCreditsCrew.name}</p> 
                        
                        {this.state.movieCreditsCast.slice(0, 5).map((cast, i) => {
                          var avatar = '';

                          if (cast.profile_path === null) {
                            avatar = '/images/default-avatar.jpg';
                          } else {
                            avatar = 'https://image.tmdb.org/t/p/w500/' + cast.profile_path;
                          }

                          return (
                            <div className="flex-item" key={i}>
                              <div
                                style={{
                                  background: 'url(' + avatar + ') center',
                                  backgroundSize: 'cover',
                                  width: '50px',
                                  height: '50px',
                                  borderRadius: '25px'
                                }}
                              />
                              <a href={"http://localhost:3000/persons/" +cast.id } >{cast.name} </a>
                            </div>
                          );
                        })}
                      </div>
                      <div className="clearfix"> </div>
                      <p className="m_4">{this.state.movieDetails.overview}</p>
                    </div>
                  <div className="clearfix"> </div>
                </div>
              </div>
            )}  
            </div>
          }
      </div>
    )
  }
}
 export default Movie 