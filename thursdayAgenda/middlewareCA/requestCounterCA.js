// Variabel som håller reda på antalet inkommande requests
let requestCount = 0;

// Middleware som räknar och loggar antalet inkommande requests
function requestCounterCA(req, res, next) {
  requestCount++;

  // Skriv ut det aktuella antalet requests i terminalen
  console.log(`Totalt antal inkommande requests: ${requestCount}`);
  next();
}

// Exporterar middleware-funktionen så att den kan användas i huvudfilen
export default requestCounterCA;
