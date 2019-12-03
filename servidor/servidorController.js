// Import servidor model
Servidor = require('./servidorModel');

// Handle index actions
exports.index = function (req, res) {
    Servidor.get(function (err, servidores) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Servidores retrieved successfully",
            data: servidores
        });
    });
};

// Handle create servidor actions
exports.new = function (req, res) {
    var servidor = new Servidor();
    servidor.nome = req.body.nome ? req.body.nome : servidor.nome;
    servidor.setor = req.body.setor;
    servidor.email = req.body.email;
    servidor.cargo = req.body.cargo;
    servidor.celular = req.body.celular;

// save the servidor and check for errors
    servidor.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New servidor created!',
            data: servidor
        });
    });
};

// Handle view servidor info
exports.view = function (req, res) {
    Servidor.findById(req.params.servidor_id)
    .populate('setor')
    .exec(function(err, servidor) {
        if (err) console.log(err);
        console.log(servidor.setor.nome)
        res.json({
            message: 'Loading Servidor details...',
            data: servidor
        })
    })
};

// Handle update setor info
exports.update = function (req, res) {
Servidor.findById(req.params.servidor_id, 
    function (err, servidor) {
        if (err)
            res.send(err);

        servidor.nome = req.body.nome ? req.body.nome : servidor.nome;
        servidor.setor = req.body.setor;
        servidor.email = req.body.email;
        servidor.cargo = req.body.cargo;
        servidor.celular = req.body.celular;

        // save the setor and check for errors
        servidor.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Servidor Info updated',
                data: servidor
            });
        });
    });
};

//Handle delete setor
exports.delete = function (req, res) {
    Servidor.deleteOne({
        _id: req.params.servidor_id
    }, function (err, servidor) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Servidor deleted'
        });
    });
};