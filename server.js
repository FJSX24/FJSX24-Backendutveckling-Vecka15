import express from "express";
import morgan from "morgan"; //HTTP-request loggningsbibliotek

import { logRequests } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import requestCounter from "./middleware/requestCounter.js";

const app = express();
const PORT = process.env.PORT || 8765;

// använda morgan middeware - logga inkommande req i terminalen
app.use(morgan("dev"));

// använda vår loggnings middleware som loggar detaljerad info till en fil och till terminalen
app.use(logRequests);

// använda vår middeware som räknar antaler inkommande requests
app.use(requestCounter);

// Startsida route (GET)
app.get("/", (req, res) => {
  res.send("hello middleware code-along!");
});

// route som avsiktligen kastar ett fel för att demonstrera felhantering
app.get("/error", (req, res) => {
  throw new Error("Simulerat serverfel");
});

// använda vår fel/error hanterings middleware, DEN SKA KOMMA SIST!!! OM något next(error) körs tidigare i kedjan så fångas det här.
app.use(errorHandler);

// Starta och lyssna på vår server
app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});
