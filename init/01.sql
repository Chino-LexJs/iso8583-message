DROP TABLE IF EXISTS terminal;

DROP TABLE IF EXISTS transaction_keys;

DROP TABLE IF EXISTS terminal_request;

DROP TABLE IF EXISTS message_request;

DROP TABLE IF EXISTS message_iso;

DROP TABLE IF EXISTS request_response;

CREATE TABLE terminal(
    id VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = INNODB;

INSERT INTO
    terminal (id, address)
VALUES
    ("PB04204S60977", "CALLE FALSA 123");

CREATE TABLE transaction_keys(
    id INT AUTO_INCREMENT,
    terminal_id VARCHAR(255) NOT NULL,
    timestamp VARCHAR(255) NOT NULL,
    check_value VARCHAR(255) NOT NULL,
    crc32 VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    rsa VARCHAR(600) NOT NULL,
    ksn VARCHAR(255) NOT NULL,
    workkey_key VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
) ENGINE = INNODB;

-- INSERT INTO
--     transaction_keys (
--         terminal_id,
--         timestamp,
--         check_value,
--         crc32,
--         name,
--         rsa,
--         ksn,
--         workkey_key
--     )
-- VALUES
--     (
--         "PB04204S60977",
--         "Wed Sep 07 2022 12:00:56 GMT-0300",
--         "CAA9B0",
--         "BF8425A0",
--         "A000BZPY72",
--         "8481B7D10576D49CE1AACACF284B13256D8313A104F9C68434E3A931759F659917BD7434198F5A358DCEF0F615FD6D84332710C30ABCD050C5D96752658AB02AFAAF053B3F0B9997DD02D12472B06EC9F0A8F5E740486E875F467572E39C0FC386EDBD882D624273B1AA44945942BAC597CC333CACB6C334743E5495E708A9B10D1A3461ED58F5A48000A1862DAB658B8B4A6F0BB45617E5AAA0538A12F776A9CC752BC8070802ECB5388A3C14D811D318378E13639DB7E96BD3824C127BC5B224A137470DCF7547961EA344B5138898302F04327B3846AA586E036AF8F17FEFF061A431223B15A8E185B85343D1A2387B274E51BD64833D15C7E0F8C6BEE861",
--         "00000101403388200001",
--         "AEA40693C054BE3A65E14D572C58EAB9"
--     );

CREATE TABLE terminal_request(
    id INT AUTO_INCREMENT,
    terminal_id VARCHAR(255),
    timestamp VARCHAR(255) NOT NULL,
    request JSON NOT NULL,
    executed VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY(id)
) ENGINE = INNODB;

CREATE TABLE message_request(
    id INT AUTO_INCREMENT,
    terminal_request_id INT,
    timestamp VARCHAR(255) NOT NULL,
    mti ENUM("0200", "0210", "0430", "0800", "0810"),
    content VARCHAR(600),
    PRIMARY KEY(id)
) ENGINE = INNODB;

CREATE TABLE execute_payment(
    id INT AUTO_INCREMENT,
    terminal_request_id INT,
    timestamp VARCHAR(255) NOT NULL,
    content JSON NOT NULL,
    PRIMARY KEY(id)
) ENGINE = INNODB;

CREATE TABLE message_response(
    id INT AUTO_INCREMENT,
    execute_id INT,
    timestamp VARCHAR(255) NOT NULL,
    mti ENUM("0200", "0210", "0430", "0800", "0810"),
    content VARCHAR(500) NOT NULL,
    PRIMARY KEY(id)
) ENGINE = INNODB;