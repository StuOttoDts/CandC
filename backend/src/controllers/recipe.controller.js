import { poolPromise } from "../db/connection.js";

/****** CREATE RECIPE ******/
export async function createRecipe(req, res) {
  const { title, ingredients, preparation,img_dir,userId } = req.body;
  
  try {
    const pool = await poolPromise;
    console.log('Criando receita:', { title, ingredients, preparation, img_dir, userId });
    await pool.request()
      .input("title", title)
      .input("ingredients", ingredients)
      .input("preparation", preparation)
      .input("img_dir", img_dir)
      .input("userId", userId)
      .query(`
        INSERT INTO Recipes (title, ingredients, preparation, img_dir, ID_USER)
        VALUES (@title, @ingredients, @preparation, @img_dir, @userId)
      `);

      res.json({ message: "Receita criada com sucesso" });

  } catch (err) {
        res.status(500).json(err);
    }
}
/****** READ RECIPE ******/
export async function getRecipes(req, res) {
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .query(`
        SELECT *
        FROM recipes
        WHERE created_at >= DATEADD(DAY, -30, GETDATE());
      `);
    res.json(result.recordset);
    console.log('Receitas obtidas:', result.recordset);
  } catch (err) {
    res.status(500).json(err);
  }
}

/****** UPDATE RECIPE ******/
export async function updateRecipe(req, res) {
  const { id } = req.params;
  const { title, ingredients, preparation,img_dir } = req.body;

    try {
        const pool = await poolPromise;
        await pool.request()
            .input("id", id)
            .input("title", title)
            .input("ingredients", ingredients)
            .input("preparation", preparation)
            .input("img_dir", img_dir)
            .query(`
                UPDATE Recipes
                SET title = @title, ingredients = @ingredients, preparation = @preparation, img_dir = @img_dir
                WHERE id = @id
            `);
        res.json({ message: "Receita atualizada com sucesso" });
    } catch (err) {
        res.status(500).json(err);
    }
}

/****** DELETE RECIPE ******/
export async function deleteRecipe(req, res) {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("id", id)
      .query(`
        DELETE FROM Recipes WHERE id = @id
      `);
    res.json({ message: "Receita deletada com sucesso" });
  } catch (err) {
    res.status(500).json(err);
  }
}