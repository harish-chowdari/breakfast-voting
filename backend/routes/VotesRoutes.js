
const express = require("express")
const router = express.Router()
const Votes = require("../model/VotesModel")

router.post("/addvote", async (req, res) => {
    const { email, vote } = req.body;

    const existingVote = await Votes.findOne({email });

    if (existingVote) {
        return res.status(400).json({ error: "User has already voted." });
    }

    const newVote = new Votes({
        email,vote
    });

    try {
        const data = await newVote.save();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to add vote." });
    }
});

module.exports = router;
