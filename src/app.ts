import { main } from "./main";
import { serverHTTP } from "./server";

const { SERVER_PORT } = process.env;

const port: number = Number(SERVER_PORT) || 3000,
  host: string = "0.0.0.0";

// inicia el servidor
serverHTTP.listen({ port, host }, async () => {
  console.log(`Server APP on port: ${serverHTTP.address().port}`);
  main();
});
