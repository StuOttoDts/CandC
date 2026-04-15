import sql from "mssql";

const config = {
  user: "sa",
  password: "12345678",
  server: "localhost",
  database: "candc",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function testConnection() {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query("SELECT 1 AS teste");

    console.log("✅ Conectou no banco!");
    console.log(result.recordset);

    await sql.close();
  } catch (err) {
    console.log("❌ Erro na conexão:");
    console.log(err);
  }
}

testConnection();