const db = require("./../data/db-config");

async function getRecipeById(id) {
  const recipe = await db("recipes as r")
    .select(
      "r.recipe_id",
      "r.recipe_name",
      "r.created_at",
      "rs.step_id",
      "rs.step_number",
      "rs.step_instructions",
      "si.ingredient_quantity",
      "i.ingredient_id",
      "i.ingredient_name",
      "i.measurement_unit"
    )
    .leftJoin("recipe_steps as rs", "rs.recipe_id", "r.recipe_id")
    .leftJoin("steps_ingredients as si", "si.step_id", "rs.step_id")
    .leftJoin("ingredients as i", "si.ingredient_id", "i.ingredient_id")
    .where("r.recipe_id", id)
    .orderBy("rs.step_number", "asc");

  const formattedRecipe = {
    recipe_id: recipe[0].recipe_id,
    recipe_name: recipe[0].recipe_name,
    created_at: recipe[0].created_at,
    steps: recipe.map((rec) => {
      return {
        step_id: rec.step_id,
        step_number: rec.step_number,
        step_instructions: rec.step_instructions,
      };
    }),
  };

  formattedRecipe.steps = formattedRecipe.steps.filter(
    (steps, index, self) =>
      index === self.findIndex((s) => s.step_id === steps.step_id)
  );

  

  formattedRecipe;

  return formattedRecipe;
}

// select r.recipe_id, r.recipe_name, r.created_at,
// rs.step_id, rs.step_number, rs.step_instructions,
// si.ingredient_quantity,
// i.ingredient_id, i.ingredient_name, i.measurement_unit
//  from recipes as r
// left join recipe_steps as rs
// on rs.recipe_id = r.recipe_id
// left join steps_ingredients as si
// on si.step_id = rs.step_id
// left join ingredients as i
// on si.ingredient_id  = i.ingredient_id
// where r.recipe_id = 1
// order by rs.step_number asc

//ONE TRIP SQL QUERY!

module.exports = { getRecipeById };
