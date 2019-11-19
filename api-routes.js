// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to SAP API crafted with love!',
    });
});
// Import controllers
var setorController = require('./setor/setorController');
var servidorController = require('./servidor/servidorController');

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

//
    
// Export API routes
module.exports = router;