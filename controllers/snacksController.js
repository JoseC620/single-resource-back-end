const express = require("express");
const snacks = express.Router();
const { getAllSnacks, getSnack, createSnack, deleteSnack, updateSnack } = require('../queries/snacks');
const { checkSnackName } = require("../validations/checkSnacks");

snacks.get("/", async ( req, res ) => {
    const allSnacks = await getAllSnacks();
    if(allSnacks[0]) {
        res.status(200).json(allSnacks);
    } else {
        res.status(500).json({ error: "server error" });
    }
});

snacks.get('/:id', async (req, res) => {
    const { id } = req.params;
    const snacks = await getSnack(id);

    if(snacks) {
        res.json(snacks);
    } else {
        res.status(404).json({ error: "Sorry! Snack was not found" })
    }
});

snacks.post('/', checkSnackName, async (req, res) => {
    const newSnack = req.body;
    try {
        const addedSnack = await createSnack(newSnack);
        res.status(200).json(addedSnack)
    } catch (error) {
        res.status(400).json({ error: error })
    }
});
   
snacks.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const removed = await deleteSnack(id);
    if(removed) {
        res.status(200).json(removed);
    } else {
        res.status(404).json({ error: "Sorry! Snack was not found" });
    }
});

snacks.put('/:id', checkSnackName, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSnack = await updateSnack(id, req.body);
        res.status(200).json(updatedSnack);
    } catch (error){
        res.status(400).json({ error: "Sorry! Snack could not be updated" });
    }
});




module.exports = snacks; 