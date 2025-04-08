// "Vi börjar med en logger som skriver ut alla inkommande anrop med datum och metod. Det är perfekt för att debugga. Kom ihåg – middleware körs i ordning, och glöm inte next()."

// Importera nödvändiga delar från Winston
import { createLogger, format, transports } from "winston";

// Destrukturera formatfunktioner för att skapa ett anpassat loggformat
const { combine, timestamp, printf } = format;

// Definiera ett anpassat loggformat som inkluderar tidpunkt, nivå och meddelande
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Skapa en logger med Winston
const loggerCA = createLogger({
  // Kombinerar flera format för att bygga en loggrad
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Lägg till en tidsstämpel
    logFormat // Använd vårt anpassade format
  ),
  transports: [
    // Skapar en loggfil där alla loggar sparas
    new transports.File({ filename: "logs/combined.log" }),

    // Loggar även direkt till konsolen (terminalen)
    new transports.Console(),
  ],
});

// Middleware-funktion som loggar varje inkommande request
function logRequestsCA(req, res, next) {
  // Logga metod och URL på varje inkommande förfrågan
  logger.info(`${req.method} ${req.url}`);
  next(); // Fortsätt till nästa middleware i kedjan
}

// Exporterar både själva loggaren och middleware-funktionen
export { loggerCA, logRequestsCA };
