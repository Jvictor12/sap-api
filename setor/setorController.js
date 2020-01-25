// Import setor model
Setor = require('./setorModel');

// Handle index actions
exports.index = function (req, res) {
    Setor.get(function (err, setores) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Setores retornados com sucesso",
            data: setores
        });
    });
};

// Handle create setor actions
exports.new = function (req, res) {
    var setor = new Setor(req.body);

    // save the setor and check for errors
    setor.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'Novo setor criado!',
            data: setor
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Setor.findById(req.params.setor_id, function (err, setor) {
        if (err)
            res.send(err);
        
        res.json({
            message: 'Detalhes do setor carregando...',
            data: setor
        });
    });
};

// Handle update setor info
exports.update = function (req, res) {
Setor.findById(req.params.setor_id, 
    function (err, setor) {
        if (err)
            res.send(err);
    
    setor.nome = req.body.nome ? req.body.nome : setor.nome;
    setor.sigla = req.body.sigla;
    setor.email = req.body.email;
    setor.ramal = req.body.ramal;

// save the setor and check for errors
    setor.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'Setor atualizado',
            data: setor
        });
    });
    });
};

// Handle delete setor
exports.delete = function (req, res) {
    Setor.deleteOne({
        _id: req.params.setor_id
    }, function (err, setor) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Setor removido'
        });
    });
};