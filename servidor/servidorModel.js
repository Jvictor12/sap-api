var mongoose = require('mongoose');

// Setup schema
var servidorSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    setor: {
        type: Schema.Types.ObjectId, 
        ref: 'setors',
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
    celular: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Servidor model
var Servidor = module.exports = mongoose.model('servidor', servidorSchema);

module.exports.get = function (callback, limit) {
    Servidor.find(callback).limit(limit);
}