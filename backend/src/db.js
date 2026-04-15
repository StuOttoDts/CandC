import sql from "mssql";

const config = {
  user: "sa",              // ou seu usuário do SQL Server
  password: "12345678",
  server: "localhost",
  database: "candc",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Conectado ao SQL Server");
    return pool;
  });