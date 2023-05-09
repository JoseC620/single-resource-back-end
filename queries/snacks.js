const snacks = require("../controllers/snacksController.js");
const db = require("../db/dbConfig.js");


const getAllSnacks = async () => {
  try {
    const allSnacks = await db.any("SELECT * FROM snacks");
    return allSnacks;
  } catch (error) {
    return error;
  }
};

const getSnack = async (id) => {
  try {
      const snack = await db.one("SELECT * FROM snacks WHERE id=$1", id);  
      return snack;
  } catch (error) {
      return error;
  }
};

const createSnack = async (snack) => {
  try {
      const newSnack = await db.one("INSERT INTO snacks (name, image, category, protein, fiber, sugar, serving_size, is_healthy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [snack.name, snack.image, snack.category, snack.protein, snack.fiber, snack.sugar, snack.serving_size, snack.is_healthy]);
      return newSnack;
  } catch (error) {
      return error;
  };
};

const deleteSnack = async (id) => {

  try {
      const removed = await db.one("DELETE FROM snacks WHERE id=$1 RETURNING *", id);
      return removed;
  } catch (error) {
      return error;
  };
};

const updateSnack = async (id, snack) => {

  try {
      const updated = await db.one("UPDATE snacks SET name=$1, image=$2, category=$3, protein=$4, fiber=$5, sugar=$6, serving_size=$7, is_healthy=$8 WHERE id=$9 RETURNING *",
      [snack.name, snack.image, snack.category, snack.protein, snack.fiber, snack.sugar, snack.serving_size, snack.is_healthy], id);
      
      return updated;
  } catch (error) {
      return error;
  };
};


module.exports = {
  getAllSnacks, 
  getSnack, 
  createSnack, 
  deleteSnack, 
  updateSnack
};