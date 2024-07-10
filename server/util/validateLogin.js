const { ObjectId } = require('mongodb');
const { Business } = require('../models/business');

const validateLogin = async (req, res, next) => {
    if (req.session.user_id) {
        next();
    } else {
        //res.render('../src/pages/Login/Login');
    }
    
}
    

module.exports = validateLogin