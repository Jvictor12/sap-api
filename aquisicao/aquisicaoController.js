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
    var aquisicao = new Aquisicao();
    console.log('antes',quisicao);
    aquisicao.etapa = 1;
    aquisicao.numAquisicao = req.body.numAquisicao;
    aquisicao.solicitante = req.body.solicitante;
    aquisicao.nProcessoSEI = req.body.nProcessoSEI;
    aquisicao.objeto = req.body.objeto;
    aquisicao.modalidade = req.body.modalidade;
    aquisicao.valorTotal = req.body.valorTotal;
    aquisicao.tipo = req.body.tipo;
    aquisicao.orcamento = req.body.orcamento;
    aquisicao.fornecedores = req.body.fornecedores;
    //aquisicao.itensSolicitados = req.body.itensSolicitados;
    console.log('depois',quisicao);
    // aquisicao.save(function (err) {
    //     if (err)
    //         res.json(err);
    //     res.json({
    //         message: 'New aquisicao created!',
    //         data: aquisicao
    //     });
    // });
};

exports.view = function (req, res) {
    Aquisicao.findById(req.params.aquisicao_id)
    .populate('fornecedores.fornecedor')
    .exec(function(err, aquisicao) {
        if (err) res.send(err);
        console.log(aquisicao)
        res.json({
            message: 'Carregando detalhes da aquisicao...',
            data: aquisicao,
        })
    })
};

// updates nas diferentes updates da aquisição
exports.update = function (req, res) {
Aquisicao.findById(req.params.aquisicao_id, 
    function(err, aquisicao) {
        if (err) {
            res.send(err);
        }

        const novaAquisicao = {};

        // switch para verificar qual a etapa do processo
        switch(aquisicao.etapa) {
            case 1:
                novaAquisicao = update1(aquisicao, req.body);
                break;
        }
        aquisicao = { ...aquisicao, ...novaAquisicao};
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

// update da primeira edição, para add fornecedor vencedor e itens aprovados para fornecimento
function update1(dadosAquisicao, novosDados) {
    const aquisicao = {};
    aquisicao = { ...dadosAquisicao };
    aquisicao.fornecedoresVencedores = novosDados.fornecedoresVencedores;
    aquisicao.itensAprovados = novosDados.itensAprovados;

    return aquisicao;
}

// Handle update setor info
// devo permitir atualização dos dados da aquisição?
// exports.update = function (req, res) {
// Setor.findById(req.params.aquisicao_id, 
//     function (err, aquisicao) {
//         if (err)
//             res.send(err);

//         var aquisicao = new Aquisicao();
//         aquisicao.etapa = 1;
//         aquisicao.solicitante = req.body.solicitante;
//         aquisicao.nProcessoSEI = req.body.nProcessoSEI;
//         aquisicao.objeto = req.body.objeto;
//         aquisicao.modalidade = req.body.modalidade;
//         aquisicao.valorTotal = req.body.valorTotal;
//         aquisicao.tipo = req.body.tipo;
//         aquisicao.orcamento = req.body.orcamento;
//         aquisicao.fornecedores = req.body.fornecedores;
//         aquisicao.itensSolicitados = req.body.itensSolicitados;

//         setor.save(function (err) {
//             if (err)
//                 res.json(err);
//             res.json({
//                 message: 'Setor Info updated',
//                 data: setor
//             });
//         });
//     });
// };

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