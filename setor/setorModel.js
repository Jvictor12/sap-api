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
    ramal: {
        type: Number,
        required: true
    },
    sigla: {
        type: String,
        required: true
    },
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