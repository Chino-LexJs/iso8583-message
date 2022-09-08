/**
 * @function trasmissionDateAndTime
 * @funcdesc Data element P-7 fecha y hora del servidor en formato: MMDDhhmmss
 * @returns {string} P-7
 */
function trasmissionDateAndTime(): string {
  let p7 = "";
  let date = new Date();
  let arrayDate: string[] = [];
  arrayDate.push((date.getMonth() + 1).toString());
  arrayDate.push(date.getDate().toString());
  arrayDate.push(date.getHours().toString());
  arrayDate.push(date.getMinutes().toString());
  arrayDate.push(date.getSeconds().toString());
  for (let i = 0; i < arrayDate.length; i++) {
    p7 = p7.concat(arrayDate[i].padStart(2, "0"));
  }
  return p7;
}
/**
 * @function localTransactionTime
 * @funcdesc Data element P-12 hora de la terminal en formato: HHMMSS
 * @returns {string} P-12
 */
function localTransactionTime(): string {
  let p12 = "";
  let terminalDateTime = new Date();
  p12 = p12.concat(
    terminalDateTime.getHours().toString().padStart(2, "0"),
    terminalDateTime.getMinutes().toString().padStart(2, "0"),
    terminalDateTime.getSeconds().toString().padStart(2, "0")
  );
  return p12;
}
/**
 * @function localTransactionDate
 * @funcdesc Data element P-13 fecha de la terminal en formato: MMDD
 * @param {string} terminalDate
 * @returns {string} P-13
 */
function localTransactionDate(): string {
  let p13 = "";
  let terminalDateTime = new Date();
  p13 = p13.concat(
    (terminalDateTime.getMonth() + 1).toString().padStart(2, "0"),
    terminalDateTime.getDate().toString().padStart(2, "0")
  );
  return p13;
}
/**
 * @function captureDate
 * @funcdesc Data element P-17 decha de la terminal en formato: MMDD
 * @returns {string} P-17
 */
function captureDate(): string {
  let p17 = "";
  let date = new Date();
  p17 = p17.concat(
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0")
  );
  return p17;
}

export {
  captureDate,
  localTransactionDate,
  localTransactionTime,
  trasmissionDateAndTime,
};
