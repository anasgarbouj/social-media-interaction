const mongoose = require('mongoose');

const clubInformations = new mongoose.Schema({
    fullName: {
        required: true,
        type: String  
    },
    email: {
        required: true,
        type: String,     
        
    },
    password: {
        required: true,   // club
        type: String,
        
    },
    dateCreation: {
        required: true,
        type: String,
    },
    establishment: {
        required: true,
        type: String,
    },
    category: {
        required: true,
        type: String,
    },
    country: {
        required: true,
        type: String,
    },
    workFiled: {
        required: true,
        type: String,
    },
    canJoin: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    }
});

module.exports = mongoose.model('clubInformations', clubInformations); 