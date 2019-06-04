const mongoose = require('mongoose');
const RoboHooverRequest = require('../models/robohooverrequest/robohooverrequest.model.js');
const RoboHooverResponse={
    message_details: String,
    hooverPosition: [],
    dirtPartsRemovalCount: Number,
    status: Number
};
const RoboHooverAudit = mongoose.Schema({
    roboHooverReq: RoboHooverRequest,
    roboHooverRes: RoboHooverResponse

},
{
    timestamps : true
})

module.exports = mongoose.model('roboHooverAudit',RoboHooverAudit);