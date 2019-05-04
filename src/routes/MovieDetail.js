import React from 'react';
import axios from '../axios';
import chart from 'billboard.js';

import 'billboard.js/dist/billboard.css'

import MovieInfo from '../components/MovieInfo/MovieInfo';
import MovieGraph from '../components/MovieInfo/MovieGraph'

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
            rank: [],
            audience: [],
            weekBoxOffice: [],
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

        // Chart 정보 받아오기
        let rankings = [11,11,11,11,11];
        let temp_audience = [0,0,0,0,0];
        let weeks = ["-","-","-","-","-"];
        let today = new Date();
        let searchDate = new Date();
        let year = today.getFullYear()+""; 
        let month; let date;
        for (let i = 4; i >= 0; i --){
            searchDate.setDate(searchDate.getDate() - 7);
            month = searchDate.getMonth() + 1;
            date = searchDate.getDate();
            month = month < 10 ? "0" + month : "" + month;
            date = date < 10 ? "0" + date : "" + date;
            let targetDate = year+month+date
            
            if (targetDate < this.state.openDate) break;
            weeks[i] = targetDate;

            let result = await axios.get("boxoffice/searchDailyBoxOfficeList.json?", {
                params: {
                    key: KEY,
                    targetDt: targetDate
                }
            })
            let boxoffice = result.data.boxOfficeResult.dailyBoxOfficeList
            let found = boxoffice.find(element => {
                return element.movieCd == this.state.movieCode
            })
    
            rankings[i] =  !found ? 11 : found.rank;
            temp_audience[i] = !found ? temp_audience[i+1] : found.audiAcc;

        }

        this.setState({
            rank: rankings,
            audience: temp_audience,
            weekBoxOffice: weeks
        })
        this._renderBoxOfficeChart();
    }

    _renderBoxOfficeChart() {
        let boxOffice = ["최근 5주 박스오피스 순위"].concat(this.state.rank)
        let audience = ["누적 관객 수"].concat(this.state.audience);

        chart.generate({
            bindto: "#myChart",
            data: {
                columns: [boxOffice, audience],
                colors: {
                    "최근 5주 박스오피스 순위": d => "#72408e",
                    "누적 관객 수": "#6fab6f"
                },
                axes: {
                    "최근 5주 박스오피스 순위": "y",
                    "누적 관객 수": "y2"
                },
                types: {
                    "최근 5주 박스오피스 순위": "line",
                    "누적 관객 수": "area-spline"
                }
            },
            axis: {
                y: {
                    inverted: true,
                    max: Math.max.apply(Math, this.state.rank)-1,
                    min: Math.min.apply(Math, this.state.rank)
                },
                y2: {
                    show: true
                },
                x: {
                    type: "category",
                    categories: this.state.weekBoxOffice
                }
            },
        });
    }
    
    render() {
        return (
            <React.Fragment>
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
                <MovieGraph />
            </React.Fragment>
        )
    }
}

export default MovieDetail