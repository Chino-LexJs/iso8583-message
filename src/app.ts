import { main, server } from "./server";

const { SERVER_PORT } = process.env;

/**
 * Numero de puerto del server
 * @type {number}
 */
const port: number = Number(SERVER_PORT) || 3000,
  /**
   * Host del servidor
   * @type {string}
   */
  host: string = "0.0.0.0";
/**
 * Inicia el servidor
 */
server.listen({ port, host }, async () => {
  console.log(`Server APP on port: ${server.address().port}`);
  main();
});
