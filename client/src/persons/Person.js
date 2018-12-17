import React, { Component } from 'react';
import axios from 'axios';

class Person extends Component {
  constructor(props){
      super(props)
      this.state = {
        person: [],
        loading: true
      }
  }

  componentDidMount() {
    axios
      .all([
        axios.get('http://localhost:3001/v1/persons/'+this.props.match.params.id),
        axios.get('http://localhost:3001/v1/acted/'+this.props.match.params.id)
      ])
      .then(
        axios.spread((personDetails, personActed) => {
          this.setState({
            personDetails: personDetails.data,
            personActed: personActed.data.cast,
            loading: false
          });
        })
      )
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="container">
        { this.state.personDetails &&
          <div className="container_wrap">
            { this.state.loading ? (
                <div>Loading...</div>
            ) : (
              <div className="content">
                <div className="movie_top">
                  <div className="col-md-9 movie_box">
                    <div className="grid images_3_of_2">
                      <div className="movie_image">
                        <img src={"https://image.tmdb.org/t/p/w500/" + this.state.personDetails.profile_path} className="img-responsive" alt=""/>
                      </div>
                    </div>
                    <div className="desc1 span_3_of_2">
                      <p className="movie_option"><strong>Name: </strong>{this.state.personDetails.name}</p>
                      <p className="movie_option"><strong>Age: </strong>{this.state.personDetails.birthday}</p>
                      <p className="movie_option"><strong>Place of birth: </strong>{this.state.personDetails.place_of_birth}</p>
                    </div>
                    <div className="clearfix"> </div>
                    <div className="clearfix">Acted</div>
                      {this.state.personActed.map((movie, i) => {
                          var poster = '';

                          if (movie.backdrop_path === null) {
                            poster = '/images/default-poster.jpg';
                          } else {
                            poster = 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path;
                          }

                          return (
                            <div className="flex-item" key={i}>
                              <div
                                style={{
                                  background: 'url(' + poster + ') center',
                                  backgroundSize: 'cover',
                                  width: '100px',
                                  height: '100px',
                                }}
                              />
                              
                              {movie.title}
                            </div>
                          );
                        })}
                    <p className="m_4">{this.state.personDetails.biography}</p>

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

export default Person