const express = require('express');
const router = express.Router();
const consultationsController = require('../controllers/ConsultationsController');
const authMiddleware = require('../middleware/authMiddleware');  // Importar o middleware de autenticação

// Rota para obter todas as consultas (aplica o middleware)
router.get('/consultations', authMiddleware, consultationsController.getConsultations);

// Rota para criar uma nova consulta (aplica o middleware)
router.post('/consultations', authMiddleware, consultationsController.createConsultation);

module.exports = router;
