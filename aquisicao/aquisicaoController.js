Aquisicao = require('./aquisicaoModel');

exports.index = function (req, res) {
    Aquisicao.get(function (err, aquisicoes) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Aquisicoes retrieved successfully",
            data: aquisicoes
        });
    });
};

exports.new = function (req, res) {
    var aquisicao = new Aquisicao(req.body);
    
    aquisicao.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New aquisicao created!',
            data: aquisicao
        });
    });
};

exports.view = function (req, res) {
    Aquisicao.findById(req.params.aquisicao_id)
    .populate('fornecedores')
    .exec(function(err, aquisicao) {
        if (err) res.send(err);
        //console.log(aquisicao)
        res.json({
            message: 'Carregando detalhes da aquisicao...',
            data: aquisicao,
        })
    })
};

// update geral
exports.updateGeral = function (req, res) {
Aquisicao.findById(req.params.aquisicao_id, 
    function(err, aquisicao) {
        if (err) {
            res.send(err);
        }

        aquisicao.etapa = 1;
        aquisicao.solicitante = req.body.solicitante;
        aquisicao.nProcessoSEI = req.body.nProcessoSEI;
        aquisicao.objeto = req.body.objeto;
        aquisicao.modalidade = req.body.modalidade;
        aquisicao.valorTotal = req.body.valorTotal;
        aquisicao.tipo = req.body.tipo;
        aquisicao.orcamento = req.body.orcamento;
        aquisicao.fornecedores = req.body.fornecedores;
        aquisicao.itensSolicitados = req.body.itensSolicitados;

        aquisicao.save(function (err) {
            if  (err) 
                res.json(err);
            res.json({
                message: 'Aquisicao Info updated',
                data: aquisicao,
            });
        });
    });
};

// UPDATE PARA ADIÇÃO DE FORNECEDOR VENCEDOR E ITENS APROVADOS
exports.updateAprovacao = function (req, res) {
Aquisicao.findById(req.params.aquisicao_id,
    function (err, aquisicao) {
        if (err) res.send(err);

        aquisicao.fornecedoresVencedores = req.body.fornecedoresVencedores;
        // mudar itens aprovados para true
        aquisicao.itens.filter(item => {
            req.body.itensAprovados.filter(itemAprov => {
                if (item._id.toString() === itemAprov._id) {
                    item.aprovado = true;
                }
            })
        })
        
        aquisicao.save(function(err) {
            if (err) res.json(err);
            res.json({
                message: 'Aquisicao atualizada para etapa 2',
                data: aquisicao,
            })
        })
    })
};

// UPDATE PARA ADD EMPENHO
exports.updateEmpenho = function (req, res) {
Aquisicao.findById(req.params.aquisicao_id,
    function (err, aquisicao) {
        if (err) {
            res.send(err);
        }

        // cadastrar empenhos e add na aquisicao
       aquisicao.empenhos = req.body;
        // console.log(req.body.empenhos)
        aquisicao.save(function(err) {
            if (err) res.json(err);
            res.json({
                message: 'Aquisicao atualizada para etapa 3',
                data: aquisicao,
            })
        })
    });
}

// UPDATE PARA ADD DATA DE ENTREGA DE ITENS E ITENS ENTREGUES
exports.updateEntrega = function (req, res) {
Aquisicao.findById(req.params.aquisicao_id,
  function(err, aquisicao) {
    if (err) res.send(err);

    aquisicao.dataEntregaItens = req.body.dataEntregaItens;

    // mudar itens aprovados para true
    aquisicao.itens.filter(item => {
      req.body.itensAdquiridos.filter(itemAdquirido => {
        if (item._id.toString() === itemAdquirido._id) {
          item.adquirido = true;
        }
      })
    });

    aquisicao.save(function(err) {
        if (err) res.json(err);
        res.json({
            message: 'Aquisicao atualizada para etapa 4',
            data: aquisicao,
        });
    });
  });
}

// UPDATE PARA ADD PAGAMENTO
exports.updatePagamento = function(req, res) {
Aquisicao.findById(req.params.aquisicao_id,
  function(err, aquisicao) {
    if (err) res.send(err);

    aquisicao.pagamentos = req.body;

    aquisicao.save(function(err) {
        if (err) res.json(err);
        res.json({
            message: 'Aquisicao atualizada para etapa 5',
            data: aquisicao,
        });
    });
  });
}

// Handle delete setor
exports.delete = function (req, res) {
    Aquisicao.deleteOne({
        _id: req.params.aquisicao_id
    }, function (err, aquisicao) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Aquisicao deleted'
        });
    });
};
