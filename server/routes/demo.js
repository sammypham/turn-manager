const express = require('express');
const router = express.Router();

const { User } = require('../models/users');
const { Business } = require('../models/business');
const { Technician } = require('../models/technician');
const { Service } = require('../models/service');


router.get('/', async(req,res) => {
    try {
        req.session.loggedIn = true;
        // Search for the user in the database
        var user = await User.findOne({ googleId: 1 });
        console.log(user)
        if (!user) {
            // If the user does not exist, create a new user
            user = new User({
                email: "demoemail",
                googleId: 1
            });

            await user.save();
        }
        req.session.user_id = user._id;
        req.session.googleId = 1;
        // Redirect to the client application
        res.status(201).json({message: "Returned"});
    } catch (error) {
        console.error(error);

        return res.status(500).json();
    }
});

module.exports = router;