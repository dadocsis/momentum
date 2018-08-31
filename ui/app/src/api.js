"use strict";
//import myData from './api.data.Json';

var fs = require('./api.data.Json');
console.log(fs);

export const getStocks = (cb) => {
  //console.log(myData)
  fetch(fs, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
    .then(rsp => rsp.json())
    .then(json => cb(json))
};

