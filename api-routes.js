// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to SAP API.',
    });
});
// Import controllers
var setorController = require('./setor/setorController');
var servidorController = require('./servidor/servidorController');
var fornecedorController = require('./fornecedor/fornecedorController');

// ROUTES -------------------------------------------------

// Setor routes
router.route('/setores')
    .get(setorController.index)
    .post(setorController.new);

router.route('/setores/:setor_id')
    .get(setorController.view)
    .patch(setorController.update)
    .put(setorController.update)
    .delete(setorController.delete);

// Servidores routes
router.route('/servidores')
    .get(servidorController.index)
    .post(servidorController.new);

router.route('/servidores/:servidor_id')
    .get(servidorController.view)
    .patch(servidorController.update)
    .put(servidorController.update)
    .delete(servidorController.delete);

// Fornecedores routes
router.route('/fornecedores')
    .get(fornecedorController.index)
    .post(fornecedorController.new);

router.route('/fornecedores/:fornecedor_id')
    .get(fornecedorController.view)
    .patch(fornecedorController.update)
    .put(fornecedorController.update)
    .delete(fornecedorController.delete);
    
// Export API routes
module.exports = router;