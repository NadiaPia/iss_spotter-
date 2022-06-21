//const {fetchMyIP} = require('./iss');
//const {fetchCoordsByIP} = require('./iss');
//const {fetchISSFlyOverTimes} = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP(ip, (error, coords) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(coords);

});


fetchISSFlyOverTimes(coords, (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
});
*/
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});
