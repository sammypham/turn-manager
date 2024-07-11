const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json({ user_id: req.session.user_id });
    } catch (error) {
        console.error(error);

        return res.status(500).json();
    }
});

module.exports = router;