"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpack = void 0;
/**
 * Unpack lo que hace es trasladar la informacion llegada por msg de los data elements
 * y colocarlo en el los fields de la clase correspondiente
 *
 * @param msg Es el mensaje en formato JSON de los data elements
 * @param fields El contenedor de los data elements
 */
function unpack(msg, fields) {
    for (let key in msg) {
        fields[key][3] = true;
        fields[key][4] = msg[key];
    }
}
exports.unpack = unpack;
