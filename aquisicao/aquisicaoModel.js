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
    itens: [{
        nome: {
            type: String,
            required: true
        },
        adquirido: {
            type: Boolean,
            default: false,
            required: true
        },
        aprovado: {
            type: Boolean,
            default: false,
            required: true,
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
    fornecedoresVencedores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'fornecedor',
            required: true
        }
    ],
    empenhos: [
    	{
        numero: {
            type: Number,
            required: true,
        },
        fornecedor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'fornecedor',
            required: true
        },
        valor: {
            type: Number,
            required: true,
        },
        create_date: {
          type: Date,
          default: Date.now
        },
        dataEnvio: {
        	type: Date,
      	},
      	enviado: {
	        type: Boolean,
  	      required: true,
    	    default: false,
      	},
      	recebido: {
        	type: Boolean,
	        required: true,
  	      default: false,
    	  },
      	dataRecebimento: {
	        type: Date,
  	    },
    	  itens: [
      	  {
            type: String,
            required: true,
        	},
      	],
      }
    ],
	  dataEntregaItens: {
	  	type: Date,
	  },
	  pagamentos: [
	  	{
	  		dataEnvioPagamento: {
	  			type: Date,
	  		},
	  		dataPagamento: {
	  			type: Date,
	  		},
	  		numeroOB: {
	  			type: String,
	  		},
	  		numNotaFiscal: {
	  			type: String,
	  		}
	  	}
	  ]
});

// Export Aquisicao model
var Aquisicao = module.exports = mongoose.model('aquisicao', aquisicaoSchema);

module.exports.get = function (callback, limit) {
    Aquisicao.find(callback).limit(limit);
}