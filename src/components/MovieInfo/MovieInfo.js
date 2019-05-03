import React from 'react';

import './MovieInfo.css'

const MovieInfo = (props) => {
    let nations = props.nations.join(", ");
    let genres = props.genres.join(", ");
    let directors = props.directors.join(", ");

    let openDate = `${props.openDate.slice(0,4)}.${props.openDate.slice(4,6)}.${props.openDate.slice(6,8)}`

    return (
        <div className="movie_info_container">
            <div>
                <div className="movie_info_ko">{props.movieName}</div>
                <div className="movie_info_en">{props.movieNameEng}</div>
            </div>
            <div className="movie_info_box">
                <div className="movie_info_detail">
                    <div><b>영화유형</b> {props.typeName}</div>
                    <div><b>제작국가</b> {nations}</div>
                    <div><b>장르</b> {genres}</div>
                </div>
                <div className="movie_info_detail">
                    <div><b>상영시간</b> {props.showTime}분</div>
                    <div><b>개봉일자</b> {openDate}</div>
                    <div><b>감독</b> {directors}</div>
                </div>
            </div>
        </div>
    )
}

export default MovieInfo;