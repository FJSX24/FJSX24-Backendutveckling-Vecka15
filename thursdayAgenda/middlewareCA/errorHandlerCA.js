// Importera loggern från logger.js
import { loggerCA } from "./loggerCA.js";

// Middleware för att hantera fel i Express-applikationen
function errorHandler(err, req, res, next) {
  // Logga själva felet med "error"-nivå
  logger.error(`Fel: ${err.message}`);

  // Skicka ett JSON-svar med statuskod 500 (Internal Server Error)
  res.status(500).json({
    error: "Serverfel",
    message: err.message, // Visa själva felmeddelandet för debugändamål
  });
}

// Exporterar felhanteringsmiddleware för användning i andra filer
export default errorHandlerCA;
