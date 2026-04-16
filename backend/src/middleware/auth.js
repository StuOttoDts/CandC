import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Sem token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SEGREDO_JWT");
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}