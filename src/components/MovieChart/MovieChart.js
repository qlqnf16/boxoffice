import React from 'react';
import Movie from './Movie'

const MovieChart = (props) => {
    return (
        <div>
            <Movie ranking={props.ranking} title={props.title}/>
        </div>
    )
};

export default MovieChart;