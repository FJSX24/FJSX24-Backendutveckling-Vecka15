// Importera nödvändiga paket
import express from "express"; // Express är ett ramverk för att skapa webbservrar i Node.js
import morgan from "morgan"; // Morgan är ett HTTP-request loggningsbibliotek

// Importera egna middleware från våra modulfiler
import { logRequestsCA } from "./middlewareCA/loggerCA.js"; // Loggning med Winston
import errorHandlerCA from "./middlewareCA/errorHandlerCA.js"; // Felhantering
import requestCounterCA from "./middlewareCA/requestCounterCA.js"; // Request-räknare

// Skapa en instans av Express-applikationen
const app = express();
const PORT = 3000; // Porten som servern kommer att lyssna på

// Middleware: Morgan - loggar inkommande requests i terminalen
// 'dev' är ett fördefinierat format som visar metod, URL, statuskod, svarstid och storlek på svaret
app.use(morgan("dev"));

// Middleware: Egen loggningsfunktion som loggar mer detaljerad information till en fil och terminal
app.use(logRequestsCA);

// Middleware: Räknar antalet inkommande requests
app.use(requestCounterCA);

// Route: En enkel GET-förfrågan som svarar med en textsträng
app.get("/", (req, res) => {
  res.send("Hello, Middleware World!");
});

// Route: En route som avsiktligt kastar ett fel för att demonstrera felhantering
app.get("/error", (req, res) => {
  throw new Error("Simulerat serverfel");
});

// Middleware: "Error-handling middleware kommer sist. Om någon next(error) körs tidigare i kedjan, fångas det här. Den ska ha fyra argument – err, req, res, next."
app.use(errorHandlerCA);

// Starta servern och lyssna på angiven port
app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
