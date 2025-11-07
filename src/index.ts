import { config } from "dotenv";
import { buildApp } from "./app.ts";

config();

const app = buildApp();

const PORT = process.env.PORT || 3000;

app
  .listen({ port: Number(PORT), host: "0.0.0.0" })
  .then(() => console.log(`🚀 Server running on port ${PORT}`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
