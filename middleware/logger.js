// skriva ut alla inkommande anrop med datum och metod. Varför? FÖr att hjälpa debugga.

import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;

// Definiera vårt loggformat, som ska inkludera tidpunkt, nivå och meddelande
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Skapa en logger med winston
const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.File({ filename: "logs/combined.log" }),

    new transports.Console(),
  ],
});

// Vår egenskapade middleware som loggar varje inkommande req.
function logRequests(req, res, next) {
  // Logga metod och URL för varje inkommande req/förfrågan
  logger.info(`${req.method} ${req.url}`);

  next();
}

// Exportera
export { logger, logRequests };
