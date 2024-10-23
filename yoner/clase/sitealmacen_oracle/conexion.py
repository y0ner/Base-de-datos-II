import cx_Oracle

dsn = cx_Oracle.makedsn('localhost', 1521, service_name='almacen2022_oracle')
connection = cx_Oracle.connect(user='isaza', password='root', dsn=dsn)

print("Conexión exitosa")
connection.close()
