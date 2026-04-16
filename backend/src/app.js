import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import recipeRoutes from "./routes/recipe.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Backend rodando 🚀" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
app.use("/recipes", recipeRoutes);
console.log("Carregou app.js");

