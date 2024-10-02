MYSQL
-------------------
mysql -u root -p

SHOW DATABASES;
USE nombre_base_de_datos;
SHOW TABLES;
CREATE TABLE nombre_tabla (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255), edad INT);
INSERT INTO nombre_tabla (nombre, edad) VALUES ('Juan', 25);
SELECT * FROM nombre_tabla;
UPDATE nombre_tabla SET edad = 30 WHERE nombre = 'Juan';
DELETE FROM nombre_tabla WHERE nombre = 'Juan';


-------------------
SQL SERVER

sudo docker exec -u root -it sqlserver bash

/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'RootPass@123' -C

use base_de_datos;

go

SELECT name FROM sys.databases;
USE nombre_base_de_datos;
SELECT * FROM nombre_tabla;
CREATE TABLE nombre_tabla (id INT PRIMARY KEY, nombre NVARCHAR(50), edad INT);
INSERT INTO nombre_tabla (nombre, edad) VALUES ('Juan', 25);
SELECT * FROM nombre_tabla;
UPDATE nombre_tabla SET edad = 30 WHERE nombre = 'Juan';
DELETE FROM nombre_tabla WHERE nombre = 'Juan';


-------------------
ORACLE

docker start oracle-xe-container

docker exec -it oracle-xe-container bash

sqlplus sys/root@//localhost:1521/XEPDB1 as sysdba

o para SYSTEM

sqlplus system/root@//localhost:1521/XEPDB1

ALTER PLUGGABLE DATABASE ALMACEN2022_ORACLE OPEN;

SELECT username FROM dba_users;
ALTER SESSION SET container = XEPDB1;
SELECT * FROM dba_tables;
CREATE TABLE nombre_tabla (id NUMBER PRIMARY KEY, nombre VARCHAR2(50), edad NUMBER);
INSERT INTO nombre_tabla (nombre, edad) VALUES ('Juan', 25);
SELECT * FROM nombre_tabla;
UPDATE nombre_tabla SET edad = 30 WHERE nombre = 'Juan';
DELETE FROM nombre_tabla WHERE nombre = 'Juan';


--------------------

POSTGRESQL

sudo -i -u postgres

psql

\l
\c nombre_base_de_datos;
\dt
CREATE TABLE nombre_tabla (id SERIAL PRIMARY KEY, nombre VARCHAR(255), edad INT);
INSERT INTO nombre_tabla (nombre, edad) VALUES ('Juan', 25);
SELECT * FROM nombre_tabla;
UPDATE nombre_tabla SET edad = 30 WHERE nombre = 'Juan';
DELETE FROM nombre_tabla WHERE nombre = 'Juan';
