/**
 * Instance de Movistar (Singleton)
 let movistar = Movistar.getInstance();
 */

async function loopReverses() {
  // let reverses = await getReverses(); // mensajes reversos con isomessage430_id IS NULL [{reverse1}, {reverse2}...]
  console.log(
    `\nBuscando Reverses...\nSe encontraron: {reverses.length} mensajes reversos sin respuesta 0430`
  );
  // sendReverseMessages(reverses);
}
async function loopEcho() {
  console.log("Loop Echo");
  /* let dataElements_0800 = {
    TransmissionDateTime: TransmissionDateTime(),
    SystemsTraceAuditNumber: "032727",
    NetworkManagementInformationCode: "301",
  };
  let mti0800 = new ISO8583(new MTI0800());
  mti0800.setFields(dataElements_0800, "0800");
  await saveMessageDataBase(
    mti0800.getMti(),
    mti0800.getSystemTraceAuditNumber(),
    mti0800.getMessage()
  );
  console.log(`\nMensaje echo 0800 a Movistar: ${mti0800.getMessage()}`);
  movistar.getSocket().write(mti0800.getMessage(), "utf8"); */
}

export { loopEcho, loopReverses };
