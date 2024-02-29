import app from "./src/app.js";
import { PORT } from "./src/config/env.config.js";

async function main() {
  //await connectToDB()
  app.listen(PORT);
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
}

main();
