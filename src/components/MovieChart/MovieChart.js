import React from 'react';
import { Link } from 'react-router-dom';

import './MovieChart.css'

const MovieChart = (props) => {
    let rankInten = '';
    if (props.rankInten == 0) rankInten = "movie_rank_zero";
    else if (props.rankInten > 0) rankInten = "movie_rank_inc";
    else rankInten = "movie_rank_dec";

    return (
        <div className="movie_box">
        <div className="movie_flex">
            <div className="movie_ranking">{props.ranking}</div>
            <div className="movie_title"><Link to={`/detail/${props.movieCode}`}>{props.title}</Link></div>
        </div>
            <div className={rankInten}></div>
        </div>
    )
};

export default MovieChart;