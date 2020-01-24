var mongoose = require('mongoose');

// Setup schema
var aquisicaoSchema = mongoose.Schema({
    // dados do cadastro
    numAquisicao: {
        type: String,
        required: true
    },
    etapa: {
        type: Number,
        required: true,
    },
    solicitante: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'servidor',
        required: true
    },
    nProcessoSEI: {
        type: String,
        required: true
    },
    dataAbertura: {
        type: Date,
        default: Date.now,
        required: true
    },
    objeto: {
        type: String,
        required: true
    },
    modalidade: {
        type: String,
        required: true
    },
    valorTotal: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    orcamento: {
        type: String,
        required: true
    },
    fornecedores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'fornecedor',
            required: true
        }
    ],
    itensSolicitados: [{
        nome: {
            type: String,
            required: true
        },
        adquirido: {
            type: Boolean,
            default: false,
            required: true
        },
        unidade: {
            type: String,
            required: true
        },
        quantidade: {
            type: Number,
            required: true
        },
        valorUnitario: {
            type: Number,
            required: true
        },
        valorTotal: {
            type: Number,
            required: true
        },
        catmat_catser: {
            type: String,
            required: true
        }
    }],
    // dados primeira edicao - fornecedores vencedores e itens aprovados para fornecimento
    // fornecedoresVencedores: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'fornecedor',
    //         required: true
    //     }
    // ],
    // itensAprovados: [{
    //     nome: {
    //         type: String,
    //         required: true
    //     },
    //     adquirido: {
    //         type: Boolean,
    //         required: true
    //     },
    //     unidade: {
    //         type: String,
    //         required: true
    //     },
    //     quantidade: {
    //         type: Number,
    //         required: true
    //     },
    //     valorUnitario: {
    //         type: Number,
    //         required: true
    //     },
    //     valorTotal: {
    //         type: Number,
    //         required: true
    //     },
    //     catmat_catser: {
    //         type: String,
    //         required: true
    //     }
    // }],
});

// Export Aquisicao model
var Aquisicao = module.exports = mongoose.model('aquisicao', aquisicaoSchema);

module.exports.get = function (callback, limit) {
    Aquisicao.find(callback).limit(limit);
}