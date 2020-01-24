var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    adquirido: {
        type: Boolean,
        required: true
    },
    unidade: {
        type: String,
        required: true
    },
    quantidade: {
        type: Integer,
        required: true
    },
    valorUnitario: {
        type: Double,
        required: true
    },
    valorTotal: {
        type: Double,
        required: true
    },
    catmat_catser: {
        type: String,
        required: true
    }
});

var Item = module.exports = mongoose.model('item', itemSchema);

module.exports.get = function (callback, limit) {
    Item.find(callback).limit(limit);
}