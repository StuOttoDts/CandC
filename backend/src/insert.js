import { poolPromise } from "./db.js";
import sql from "mssql";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const pool = await poolPromise;

  await pool.request()
    .input("name", sql.VarChar, name)
    .input("email", sql.VarChar, email)
    .input("password", sql.VarChar, hash)
    .query(`
      INSERT INTO Users (name, email, password)
      VALUES (@name, @email, @password)
    `);

  res.json({ message: "Usuário criado" });
}