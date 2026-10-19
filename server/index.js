import http from "http";
import { PORT } from "./config/env.js";
import app from "./app.js";
import connectDB from "./config/database.js";
import { initSocket } from "./socket.js";

async function main() {
  // Verify DB connection before accepting traffic
  await connectDB();

  console.log(process.env.DATABASE_URL);

  const server = http.createServer(app);
  initSocket(server);

  server.listen(PORT, () => {
    console.log(`[SERVER] eGrowth India API running on http://localhost:${PORT}`);
    console.log(`[SERVER] Base path: /api/v1`);
    console.log(`[SOCKET] Realtime Socket.io server ready`);
  });
}

main().catch((err) => {
  console.error("[FATAL]", err);
  process.exit(1);
});
