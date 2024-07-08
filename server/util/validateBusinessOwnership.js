const { ObjectId } = require('mongodb');
const { Business } = require('../models/business');

const validateBusinessOwnership = async (req, res, next) => {

    if (req.session.currentBusiness.owner == req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
    
}
    

module.exports = validateBusinessOwnership