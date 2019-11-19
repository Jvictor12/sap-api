var mongoose = require('mongoose');

// Setup schema
var setorSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    setor: {
        type: Number,
        required: true
    },
    celular: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Setor model
var Setor = module.exports = mongoose.model('setor', setorSchema);

module.exports.get = function (callback, limit) {
    Setor.find(callback).limit(limit);
}