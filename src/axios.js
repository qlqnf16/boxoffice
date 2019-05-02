import axios from 'axios';

export default axios.create({
    baseURL: `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?`
})