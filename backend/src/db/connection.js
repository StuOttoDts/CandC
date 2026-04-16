import sql from "mssql";

const config = {
  user: "sa",        // ex: sa
  password: "12345678",
  server: "localhost", // 👈 importante!
  database: "candc",

  options: {
    encrypt: false, // obrigatório para SQL Server local
    trustServerCertificate: true
  }
};

// cria pool de conexão
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ Conectado ao SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("❌ Erro na conexão:", err);
  });

export { sql, poolPromise };