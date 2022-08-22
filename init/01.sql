DROP TABLE IF EXISTS folio;

DROP TABLE IF EXISTS mensaje;

CREATE TABLE folio(
    folio_id INT AUTO_INCREMENT,
    terminal_id VARCHAR(255) NOT NULL,
    date_folio date NOT NULL,
    monto_folio VARCHAR(255) NOT NULL,
    PRIMARY KEY (folio_id)
) ENGINE = INNODB;

CREATE TABLE mensaje(
    mensaje_id INT AUTO_INCREMENT,
    id_folio INT NOT NULL,
    mti VARCHAR(255) NOT NULL,
    origen ENUM('pideaky', 'terminal', 'prosa') NOT NULL,
    destino ENUM('pideaky', 'terminal', 'prosa') NOT NULL,
    contenido JSON NOT NULL,
    PRIMARY KEY(mensaje_id),
    INDEX (id_folio),
    FOREIGN KEY (id_folio) REFERENCES folio(folio_id)
) ENGINE = INNODB;