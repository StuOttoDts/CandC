import { sql, poolPromise } from "../db/connection.js"; // 👈 você ESQUECEU isso
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
  const { name, username, password } = req.body;

  try {
    const pool = await poolPromise;

    const hash = await bcrypt.hash(password, 10);

    await pool.request()
      .input("name", sql.VarChar, name)
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hash)
      .query(`
        INSERT INTO Users (name, username, password)
        VALUES (@name, @username, @password)
      `);

    res.json({ message: "Usuário criado com sucesso" });

  } catch (err) {
    res.status(500).json(err);
  }
}

// 🔥 FALTAVA ISSO
export async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("username", sql.VarChar, username)
      .query(`
        SELECT * FROM Users WHERE username = @username
      `);

    const user = result.recordset[0];

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    res.json({ message: "Login ok" });
    

  } catch (err) {
    res.status(500).json(err);
  }
}
/* ========================= */
/* GET USER BY ID */
/* ========================= */
export async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        SELECT id, username, name
        FROM Users
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(result.recordset[0]);

  } catch (err) {
    res.status(500).json(err);
  }
}