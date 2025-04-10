let requestCount = 0;

// Middleware som räknar och loggar antalet inkommande req
function requestCounter(req, res, next) {
  requestCount++;

  //   Skriva ut det aktuella antalet i requesten i terminalen
  console.log(`Totalt antal inkommande request: ${requestCount}`);

  next();
}

// exportera
export default requestCounter;
