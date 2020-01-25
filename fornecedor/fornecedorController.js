// Import fornecedor model
Fornecedor = require('./fornecedorModel');

// Handle index actions
exports.index = function (req, res) {
    Fornecedor.get(function (err, fornecedores) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Fornecedores retrieved successfully",
            data: fornecedores
        });
    });
};

// Handle create fornecedor actions
exports.new = function (req, res) {
    var fornecedor = new Fornecedor(req.body);

    // save the fornecedor and check for errors
    fornecedor.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New fornecedor created!',
            data: fornecedor
        });
    });
};

// Handle view fornecedor info
exports.view = function (req, res) {
    Fornecedor.findById(req.params.fornecedor_id, 
        function (err, fornecedor) {
            if (err)
                res.send(err);
            res.json({
                message: 'Fornecedor details loading..',
                data: fornecedor
            });
        }
    );
};

// Handle update fornecedor info
exports.update = function (req, res) {
    Fornecedor.findById(req.params.fornecedor_id, 
        function (err, fornecedor) {
            if (err)
                res.send(err);

            fornecedor.razaoSocial = req.body.razaoSocial ? req.body.razaoSocial : setor.razaoSocial;
            fornecedor.nomeFantasia = req.body.nomeFantasia;
            fornecedor.cnpj = req.body.cnpj;
            fornecedor.cidadeEstado = req.body.cidadeEstado;
            fornecedor.telefone = req.body.telefone;
            fornecedor.email = req.body.email;
            fornecedor.responsavel = req.body.responsavel;
            fornecedor.listaNegra = req.body.listaNegra;

            // save the fornecedor and check for errors
            fornecedor.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Fornecedor Info updated',
                    data: fornecedor
                });
            });
    });
};

exports.alterarListaNegra = function(req, res) {
Fornecedor.findById(req.params.fornecedor_id,
    function(err, fornecedor) {
        if (err) res.send(err);

        fornecedor.listaNegra = !fornecedor.listaNegra;

        fornecedor.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Fornecedor info updated',
                data: fornecedor
            });
        });
    });
}

// Handle delete fornecedor
exports.delete = function (req, res) {
    Fornecedor.deleteOne({_id: req.params.fornecedor_id}, 
        function (err, fornecedor) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'Fornecedor deleted'
            });
        }
    );
};