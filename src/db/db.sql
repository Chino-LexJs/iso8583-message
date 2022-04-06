create database pideakytest;

-- \l visualiza todas las BD creadas
-- \c pideakytest se conecta a la base de datos pideakytest
-- \dt lista las tablas creadas
-- \q para salir...
-- select * from folios | mensajes; para ver los datos de la tabla
DROP TABLE IF EXISTS folio;

DROP TABLE IF EXISTS mensaje;

CREATE TYPE entidad AS ENUM ('pideaky', 'terminal', 'prosa');

CREATE TABLE folio(
    folio_id INT GENERATED ALWAYS AS IDENTITY,
    terminal_id VARCHAR(255) NOT NULL,
    date_folio date NOT NULL,
    monto_folio VARCHAR(255) NOT NULL,
    PRIMARY KEY(folio_id)
);

CREATE TABLE mensaje(
    mensaje_id INT GENERATED ALWAYS AS IDENTITY,
    folio_id INT NOT NULL,
    mti VARCHAR(255) NOT NULL,
    origen entidad NOT NULL,
    destino entidad NOT NULL,
    contenido json NOT NULL,
    PRIMARY KEY(mensaje_id),
    CONSTRAINT fk_folio FOREIGN KEY(folio_id) REFERENCES folio(folio_id)
);