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
var aquisicaoController = require('./aquisicao/aquisicaoController');

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

// ROTA PARA ADD OU REMOVER FORNECEDOR DA LISTA NEGRA
router.route('/fornecedores/alterar-lista-negra/:fornecedor_id')
    .put(fornecedorController.alterarListaNegra)
    .patch(fornecedorController.alterarListaNegra);

// Rotas Aquisição
router.route('/aquisicoes')
    .get(aquisicaoController.index)
    .post(aquisicaoController.new);

router.route('/aquisicoes/:aquisicao_id')
    .get(aquisicaoController.view)
    .patch(aquisicaoController.updateGeral)
    .put(aquisicaoController.updateGeral)
    .delete(aquisicaoController.delete);

// rotas de atualização de etapas

// ROTAS DE ATUALIZAÇÃO PARA INCLUSÃO DE FORNECEDORES VENCEDORES E ITENS APROVADOS
router.route('/aquisicoes/add-aprovacao/:aquisicao_id')
    .patch(aquisicaoController.updateAprovacao)
    .put(aquisicaoController.updateAprovacao)

// ROTAS DE ATUALIZAÇÃO PARA INCLUSÃO DE EMPENHO
router.route('/aquisicoes/add-empenho/:aquisicao_id')
    .patch(aquisicaoController.updateEmpenho)
    .put(aquisicaoController.updateEmpenho)

// ROTAS DE ATUALIZAÇÃO PARA INCLUSÃO DE RECEBIMENTO DE ITENS
router.route('/aquisicoes/add-entrega/:aquisicao_id')
    .patch(aquisicaoController.updateEntrega)
    .put(aquisicaoController.updateEntrega)

// ROTAS DE ATUALIZAÇÃO PARA INCLUSÃO DE PAGAMENTO
router.route('/aquisicoes/add-pagamento/:aquisicao_id')
    .patch(aquisicaoController.updatePagamento)
    .put(aquisicaoController.updatePagamento)
    
// Export API routes
module.exports = router;