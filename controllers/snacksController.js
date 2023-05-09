const express = require("express");
const snacks = express.Router();
const { getAllSnacks, getSnack, createSnack, deleteSnack, updateSnack } = require('../queries/snacks');

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

snacks.post('/', async (req, res) => {
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
    if(deleteSnack.id) {
        res.status(200).json(removed);
    } else {
        res.status(404).json({ error: "Sorry! Snack was not found" });
    }
});

snacks.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const updated = await updateSnack(id, body);
        res.status(200).json(updated);
    } catch (error){
        res.status(400).json({ error: "Sorry! Snack could not be updated" });
    }
});




module.exports = snacks; 