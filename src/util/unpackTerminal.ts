import { util_tokenES } from "./utils_dataElements/util_tokenES";

function transactionDateTime(date_time: string): {
  [key: string]: string;
} {
  let dateTime = {
    date: "",
    time: "",
  };
  let date = new Date(Date.parse(date_time));
  let LocalTransactionTime = "",
    LocalTransactionDate = "";
  let day =
    date.getDate() < 10
      ? `0${date.getDate().toString()}`
      : date.getDate().toString();
  let month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;

  dateTime.date = LocalTransactionDate.concat(month, day);
  dateTime.time = LocalTransactionTime.concat(
    date.getHours().toString(),
    date.getMinutes().toString(),
    date.getSeconds().toString()
  );
  return dateTime;
}

export function unpackTerminal(message: { [key: string]: any }): {
  [key: string]: string;
} {
  let dateTime = transactionDateTime(message.DATE_TIME);
  let messageUnpack = {
    TransactionAmount: message.AMOUNT.split(".").join(""), // falta agregarle ceros restantes para completar N(12)
    LocalTransactionTime: dateTime.time,
    LocalTransactionDate: dateTime.date,
    PointServiceEntryMode: message.ENTRY_MODE,
    PointServiceConditionCode: message.CONDITION_CODE,
    CardAcceptorTerminalID: message.TERMINAL_ID,
    AdditionalData: dataTokenTerminal(message.KEY, message.DEVICE),
  };
  return messageUnpack;
}

function dataTokenTerminal(
  key: { [key: string]: string },
  device: { [key: string]: string }
): string {
  // Hardcodeado: Hay que buscar los id en la base de datos
  let idTablaDeBinesCaja: string = "IDBinesCaja",
    idTablaDeBinesPinPad: string = "IDBinesPinPad",
    banderaPeticionNuevaLlave = "0";
  let isoTokenES: string = util_tokenES(
    device.version,
    device.serial_number,
    idTablaDeBinesCaja,
    idTablaDeBinesPinPad,
    banderaPeticionNuevaLlave
  );

  return isoTokenES;
}
