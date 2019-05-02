import React from 'react';
import './Movie.css';

const Movie = (props) => {
    return(
        <div className="movie_box">
            <div className="movie_ranking">{props.ranking}</div>
            <div className="movie_title">{props.title}</div>
        </div>
    )
}

export default Movie;