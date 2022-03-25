/**
 * 
 * @param message 
 * let JSON = {
  MTI: "REQUEST", // Message Type Indetifier 0200
  ProcessingCode: "000000", // P3 Processing code
  AmountTransaction: "000000054000", // P4 amount transaction
  TransmissionDateTim: "0926183724", // P7 Transmition date y time
  LocalTransactionTime: "185100", // P12 Time, local transaction
  LocalTransactionDate: "0926", // P13 Date, local transaction
  PointServiceEntryMode: "901", // P22 Point of service enrty mode
  PointServiceConditionCode: "00", // P25 Point of Service Condition Code
  CardAcceptorTerminalID: "CEN50FRDSS787932", // P41 Card Acceptor Terminal ID
  AdditionalData: "030101B0200VAFAAR8303306", // P63 Additional Data
};
 * @returns 
 */

export function componentsMessage(message: { [key: string]: string }): {
  [keys: string]: any;
} {
  let components = new Map();
  components.set("iso", "ISO");
  

  return components;
}
