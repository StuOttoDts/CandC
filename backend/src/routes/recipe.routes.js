import express from "express";
import {
  createRecipe,
  getRecipes
} from "../controllers/recipe.controller.js";

const router = express.Router();

router.post("/", createRecipe);
router.get("/", getRecipes);

export default router;

console.log("Carregou recipe.routes");