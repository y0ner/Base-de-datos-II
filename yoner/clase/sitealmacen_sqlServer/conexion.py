import pyodbc

conn_str = (
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=localhost,1433;"
    "DATABASE=almacen2022_sqlserver;"
    "UID=sa;"
    "PWD=RootPass@123;"
    "Encrypt=no;"
    "TrustServerCertificate=yes;"
)

try:
    with pyodbc.connect(conn_str) as conn:
        print("Conexión exitosa!")
except Exception as e:
    print(f"Error de conexión: {e}")
