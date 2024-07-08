const { ObjectId } = require('mongodb');
const { Business } = require('../models/business');

const validateBusinessOwnership = async (req, res, next) => {

    if (req.session.currentBusiness && req.session.currentBusiness.owner == req.session.user_id) {
        next();
    } else {
        res.redirect('/login');
    }
    
}
    

module.exports = validateBusinessOwnership