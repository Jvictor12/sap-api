var mongoose = require('mongoose');

// Setup schema
var fornecedorSchema = mongoose.Schema({
    razaoSocial: {
        type: String,
        required: true
    },
    nomeFantasia: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    cidadeEstado: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    responsavel: {
        type: String,
        required: true
    },
    listaNegra: {
        type: Boolean,
        default: false,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Fornecedor model
var Fornecedor = module.exports = mongoose.model('fornecedor', fornecedorSchema);

module.exports.get = function (callback, limit) {
    Fornecedor.find(callback).limit(limit);
}