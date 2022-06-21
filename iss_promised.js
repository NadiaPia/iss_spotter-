const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  return request('http://ip-api.com/json/' + JSON.parse(body).ip);

};

const fetchISSFlyOverTimes = function(body) {
  let obj = JSON.parse(body);
  let coords = {};
  coords['latitude']  =  obj['lat'];
  coords['longitude'] = obj['lon'];
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coords["latitude"]}&lon=${coords["longitude"]}`);

};

// const printPassTimes = function(passTimes) {
//   let obj = JSON.parse(passTimes);
//   let issFly = obj["response"];
//   for (const pass of issFly) {
//     const datetime = new Date(0);
//     datetime.setUTCSeconds(pass.risetime);
//     const duration = pass.duration;
//     console.log(`Next pass at ${datetime} for ${duration} seconds!`);
//   }
// };

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      let obj = JSON.parse(data);
      let issFly = obj["response"];
      return issFly;
    });
};


module.exports = {nextISSTimesForMyLocation};