//Importation d'express js
const express = require('express')
const router = express.Router()

const {getConducteur, postConducteur, putConducteur, deleteConducteur} = require('../controllers/conducteurController')

router.get('/api/conducteur', getConducteur);
router.post('/api/conducteur',  postConducteur)
router.put('/api/conducteur/:id', putConducteur);
router.delete('/api/conducteur/:id',  deleteConducteur)



module.exports = router;
