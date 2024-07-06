const { ObjectId } = require('mongodb');
const { Business } = require('../models/business');

const validateBusinessOwnership = async (req, res) => {
    const businessId = req.query.business_id;
    const userId = req.session.user_id;

    if (!businessId || !userId) {
        throw new Error('Business ID and User ID are required');
    }

    // Find the business and check ownership
    const business = await Business.findOne({ _id: new ObjectId(businessId) });

    if (!business) {
        throw new Error('Business not found');
    }

    if (business.owner_id.toString() !== userId.toString()) {
        throw new Error('User does not own this business');
    }
}

module.exports = validateBusinessOwnership