import { logger } from "./logger.js";

// Skapa vårt felhanterings middleware
function errorHandler(err, req, res, next) {
  // Logga felet med en "error-nivå"
  logger.error(`Fel!!!: ${err.message}`);

  // Skicka svaret som JSON med en statuskod 500 internal server error
  res.status(500).json({
    error: "Severfel",
    message: err.message, //Visa själva felmeddelandet för debugändamål
  });
}

// Exportera
export default errorHandler;
