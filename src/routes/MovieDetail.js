import React from 'react';
import axios from '../axios';

import MovieInfo from '../components/MovieInfo/MovieInfo'

const KEY = process.env.REACT_APP_KOBIS_API_KEY;

class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
        let match = props.match
        this.state = {
            movieCode: match.params.movieCd,
            movieName: '',
            movieNameEng: '',
            showTime: 0,
            openDate: '',
            typeName: '',
            nations: [],
            genres: [],
            directors: [],
        }
    }

    componentDidMount = async () => {
        let result = await axios.get("movie/searchMovieInfo.json?", {
            params: {
                key: KEY,
                movieCd: this.state.movieCode
            }
        })
        result = result.data.movieInfoResult.movieInfo

        let newNations = [];
        let newGenres = [];
        let newDirectors = [];
        
        result.nations.map((nation, key)=>{
            newNations.push(Object.values(nation)[0])
        })
        result.genres.map((genre, key)=>{
            newGenres.push(Object.values(genre)[0])
        });
        result.directors.map((director, key)=>{
            newDirectors.push(Object.values(director)[0])
        });

        this.setState({
            movieName: result.movieNm,
            movieNameEng: result.movieNmEn,
            showTime: result.showTm,
            openDate: result.openDt,
            typeName: result.typeNm,
            nations: newNations,
            genres: newGenres,
            directors: newDirectors
        })

    }
    
    render() {
        return (
            <MovieInfo 
                movieName={this.state.movieName} 
                movieNameEng={this.state.movieNameEng}
                showTime={this.state.showTime}
                openDate={this.state.openDate}
                typeName={this.state.typeName}
                nations={this.state.nations} 
                genres={this.state.genres}
                directors={this.state.directors} 
                />
        )
    }
}

export default MovieDetail