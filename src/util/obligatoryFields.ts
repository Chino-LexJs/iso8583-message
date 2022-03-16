/**
 * Segun el tipo de mensaje (MTI) le corresponde un arreglo con los data elements correspondientes segun PROSA
 */
const obligatoryFields = {
  "0200": [
    1, 3, 4, 7, 11, 12, 13, 17, 18, 22, 25, 32, 35, 37, 41, 42, 43, 48, 49, 54,
    60, 61, 62, 63, 90, 95, 100, 120, 121, 123, 125, 126,
  ], // Solicitud de transaccion financiera
  "0800": [1, 7, 11, 70], // Solicitud de gestion de red
};
export default obligatoryFields;
