DROP TABLE IF EXISTS terminal;

DROP TABLE IF EXISTS message_request;

DROP TABLE IF EXISTS message_iso;

DROP TABLE IF EXISTS request_response;

CREATE TABLE terminal(
    terminal_id VARCHAR(255) NOT NULL,
    direction VARCHAR(255) NOT NULL,
    PRIMARY KEY (terminal_id)
) ENGINE = INNODB;

INSERT INTO terminal (terminal_id, direction) VALUES ("PB04204S60977","CALLE FALSA 123");

CREATE TABLE message_request(
    request_id INT AUTO_INCREMENT,
    mti VARCHAR(255) NOT NULL,
    content JSON NOT NULL,
    PRIMARY KEY(request_id),
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