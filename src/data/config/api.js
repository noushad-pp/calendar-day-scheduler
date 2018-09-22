import axios from 'axios';

import * as CONSTANTS from './constants';

const method_types = {
    get: "GET",
    post: "POST",
    delete: "DELETE",
    put: "PUT"
};

function getHeaders() {
    let user = localStorage.getItem('user');
    user = user && (user !='undefined') ? JSON.parse(localStorage.getItem('user')) : null;
    let headers = {
        'Content-Type': 'application/json'
    };
    if (user && (user.uid || user._id) && user.hash) {
        headers.user_token = user.token;
    }
    return headers;
}

function fetchDataAndProceed(url, method, data) {
    return axios({
        method: method,
        params: method === 'GET' ? data : {},
        data: method !== 'GET' ? data : {},
        url: url,
        baseURL: CONSTANTS.base_url,
        headers: getHeaders()
    });
}

/*--------------------------- APIS ------------------------ */
export const getLocationFromIp = (data, callback) => {
    fetchDataAndProceed('https://freegeoip.net/json/', method_types.get).then(function (response) {
        callback(false, response);
    }).catch(function (error) {
        callback(true, error);
    });
};


export const getCalenderEvents = () => {
    //this function can be replaced with your backend API
    const events = [
        {
            id: 1,
            start: 40,
            end: 135,
            text: "09:40am to 11:15am"
        },
        {
            id: 2,
            start: 550,
            end: 600,
            text: "06:10pm to 07:00pm"
        },
        {
            id: 3,
            start: 570,
            end: 630,
            text: "06:30pm to 07:30pm"
        },
        {
            id: 4,
            start: 605,
            end: 665,
            text: "07:05pm to 08:05pm"
        }
    ];

    return events;
};

