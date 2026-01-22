import { WebSocketServer } from "ws";
import http from "http";
// Wir nutzen den internen Pfad direkt über das Dateisystem, um das Export-Verbot zu umgehen
import { setupWSConnection } from "./node_modules/y-websocket/bin/utils.js";

const port = process.env.PORT || 1234;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Yjs WebSocket Server is active");
});

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (conn, req) => {
  // setupWSConnection verwaltet das Dokumenten-Management automatisch
  setupWSConnection(conn, req);
  console.log(
    `[${new Date().toLocaleTimeString()}] Verbindung hergestellt: ${req.url}`
  );
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log("-----------------------------------------");
  console.log(`🚀 LEM-SERVER ist online`);
  console.log(`📡 Port: ${port}`);
  console.log(`🔧 Modus: High-Performance (Yjs)`);
  console.log("-----------------------------------------");
});
