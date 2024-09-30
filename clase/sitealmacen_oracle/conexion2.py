import cx_Oracle

# Datos de conexión
username = 'system'  # O el usuario que prefieras
password = 'root'    # Contraseña definida en tu contenedor
dsn = 'localhost:1521/XEPDB1'  # La conexión a tu Oracle en Docker

# Conectar a Oracle
try:
    connection = cx_Oracle.connect(username, password, dsn)
    print("Conexión exitosa!")
except cx_Oracle.DatabaseError as e:
    print(f"Error al conectarse a Oracle: {e}")
