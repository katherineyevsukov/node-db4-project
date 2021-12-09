const db = require("./../data/db-config");

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

//ONE TRIP SQL QUERY!
