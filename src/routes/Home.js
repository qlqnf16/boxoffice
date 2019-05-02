import React from 'react';
import axios from '../axios';

import '../components/MovieChart/MovieChart'

import './Home.css';
import MovieChart from '../components/MovieChart/MovieChart';

const API_KEY = process.env.REACT_APP_KOBIS_API_KEY;

let year = ''+new Date().getFullYear();
let month = new Date().getMonth()+1;
let date = new Date().getDate()-1;

month = month < 10 ? '0' + month : '' + month;
date = date < 10 ? '0' + date : '' + date;
let today = year+month+date;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: today,
            dailyBoxOfficeList: []
        };
    };
    
    componentDidMount = async () => {
        this.getResult(this.state.date)
    }

    getResult = async (getDate) => {
        let result = await axios.get('', {
            params: {
                key: API_KEY,
                targetDt: getDate
            }
        });

        this.setState({
            dailyBoxOfficeList: result.data.boxOfficeResult.dailyBoxOfficeList
        })
    }
    
    handleDateChange = e => {
        let changedDate = e.target.value.split("-").join("");
        this.setState({
            date: changedDate
        })
        this.getResult(changedDate);
    }

    render() {
        let charts = this.state.dailyBoxOfficeList.map((movie, key) => (
            <MovieChart
              key={key}
              ranking={movie.rank}
              title={movie.movieNm}
            />
          ));

        let today_with_dash = `${year}-${month}-${date}`
        let date_with_dash = `${this.state.date.slice(0,4)}-${this.state.date.slice(4,6)}-${this.state.date.slice(6,8)}`

        return (
            <div className="home_container">
                <div className="home_title"><b>BOX OFFICE:</b> {date_with_dash}</div>
                <div className="home_date">
                    Want different date? 
                    <input type="date" max={today_with_dash} value={today_with_dash} onChange={this.handleDateChange} />
                </div>
                {charts}
            </div>
        )
    }
}

export default Home;