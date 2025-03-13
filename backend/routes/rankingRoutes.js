const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/rankingController');

router.get('/ranking', rankingController.getRanking);

router.post('/raking/add-points', rankingController.addPoints);

module.exports = router;