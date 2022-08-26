create database pideakytest;

-- Especificar el uso de SQL:  \sql
-- Conectarse a la base de datos:  \connect root@localhost
-- show databases; Muestra las bases de datos creadas
-- use pideakytest; Para conectarse a la base de datos pideakytest
-- show columns from `table_name`; Para mostrar los parametros de cada tabla
DROP TABLE IF EXISTS terminal;

DROP TABLE IF EXISTS folio;

DROP TABLE IF EXISTS message_request;

DROP TABLE IF EXISTS message_iso;

DROP TABLE IF EXISTS request_response;

CREATE TABLE terminal(
    terminal_id VARCHAR(255) NOT NULL,
    direction VARCHAR(255) NOT NULL,
    PRIMARY KEY (terminal_id)
) ENGINE = INNODB;

CREATE TABLE folio(
    folio_id INT AUTO_INCREMENT,
    id_terminal VARCHAR(255) NOT NULL,
    date_folio date NOT NULL,
    monto_folio INT NOT NULL,
    PRIMARY KEY (folio_id),
    INDEX (id_terminal),
    FOREIGN KEY (id_terminal) REFERENCES terminal(terminal_id)
) ENGINE = INNODB;

CREATE TABLE message_request(
    request_id INT AUTO_INCREMENT,
    id_folio INT NOT NULL,
    mti VARCHAR(255) NOT NULL,
    content JSON NOT NULL,
    PRIMARY KEY(request_id),
    INDEX (id_folio),
    FOREIGN KEY (id_folio) REFERENCES folio(folio_id)
) ENGINE = INNODB;

CREATE TABLE message_iso(
    message_iso_id INT AUTO_INCREMENT,
    id_request INT NOT NULL,
    mti ENUM("0200", "0210", "0430", "0800", "0810") NOT NULL,
    content VARCHAR(500) NOT NULL,
    PRIMARY KEY(message_iso_id),
    INDEX (id_request),
    FOREIGN KEY (id_request) REFERENCES message_request(request_id)
) ENGINE = INNODB;

CREATE TABLE request_response(
    response_id INT AUTO_INCREMENT,
    id_request INT NOT NULL,
    mti int NOT NULL,
    content VARCHAR(500) NOT NULL,
    PRIMARY KEY(response_id),
    INDEX (id_request),
    FOREIGN KEY (id_request) REFERENCES message_request(request_id)
) ENGINE = INNODB;

INSERT INTO terminal (terminal_id, direction) VALUES ("PB04204S60977","CALLE FALSA 123");