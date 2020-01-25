var mongoose = require('mongoose');

var empenhoSchema = mongoose.Schema({
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
});

var Empenho = module.exports = mongoose.model('empenho', empenhoSchema);

module.exports.get = function (callback, limit) {
	Empenho.find(callback).limit(limit);
}