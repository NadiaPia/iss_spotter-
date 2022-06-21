const request = require('request');


const fetchMyIP = function(callback) {
  let url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (!response) {
      callback("no response from a host", null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (error) {
      callback(error, null);
      return;
    }
    
    let jsonData = JSON.parse(body);    
    callback(null, jsonData.ip);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  let url = 'http://ip-api.com/json/' + ip;
  
  request(url, (error, response, body) => {
    if (!response) {
      callback("no response from a host", null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (error) {
      callback(error, null);
      return;
    }
    
    let obj = JSON.parse(body);    
    let coords = {};
    coords['latitude']  =  obj['lat'];
    coords['longitude'] = obj['lon'];    
    callback(null, coords);

  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  let url  = `https://iss-pass.herokuapp.com/json/?lat=${coords["latitude"]}&lon=${coords["longitude"]}`;
  
  request(url, (error, response, body) => {
    if (!response) {
      callback("no response from a host", null);
      return;
    }
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    if (error) {
      callback(error, null);
      return;
    }

    let obj = JSON.parse(body);
    let issFly = obj["response"];
    callback(null, issFly);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {    
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      
      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
      
    });

  });
  
};

module.exports = {nextISSTimesForMyLocation};