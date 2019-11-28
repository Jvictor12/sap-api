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
    // Servidor.findById(req.params.servidor_id, function (err, servidor) {
    //     if (err)
    //         res.send(err);
    //     res.json({
    //         message: 'Servidor details loading..',
    //         data: servidor
    //     });
    // });
    Servidor.
    findOne({ _id:req.params.servidor_id })
    .populate('setors')
    .exec(function (err, servidor) {
        if (err) {
            res.json(err);
        }
        console.log('setor: ',servidor.setor.nome)
        res.json({
            message: 'Servidor details loading...',
            data: servidor
        })
    })
};

// Handle update setor info
// exports.update = function (req, res) {
// Setor.findById(req.params.setor_id, function (err, setor) {
//         if (err)
//             res.send(err);

//     setor.nome = req.body.nome ? req.body.nome : setor.nome;
//     setor.sigla = req.body.sigla;
//     setor.email = req.body.email;
//     setor.ramal = req.body.ramal;

// // save the setor and check for errors
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
// exports.delete = function (req, res) {
//     Setor.remove({
//         _id: req.params.setor_id
//     }, function (err, setor) {
//         if (err)
//             res.send(err);
// res.json({
//             status: "success",
//             message: 'Setor deleted'
//         });
//     });
// };