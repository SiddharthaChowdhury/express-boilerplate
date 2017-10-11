// Users.js
module.exports = {
    name: String,
    email : String,
    password : {
        type: String,
        default: 'test'
    },
    usertype : {
        type: String,
        enum: ['administrator','manager','resources'],
        default: 'resources'
    },
    empid : String,
    position : String,
    phone : String,
    status : {
        type: String,
        enum: ['activated','not-activated'],
        default: 'activated'
    },
    Project : [],
    lastLogin : {
        type:Date
    },
    // createdAt : Date.now
}