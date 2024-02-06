//Importation d'express js
const express = require('express')
const router = express.Router()
//Import de prisma
const prisma = require('../prisma/prismaClient')




// Routes pour les passager
router.get('/api/passager', async (req, res) => {
    try {
      const passagers = await prisma.passager.findMany();
      res.json(passagers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la récupération des passagers depuis la base de données' });
    }
  });


  // ...
  router.post('/api/passager', async (req, res) => {
    try {
      console.log('Requête POST reçue');
      console.log('Corps de la requête :', req.body); // Ajoutez cette ligne pour voir le contenu du corps de la requête
  
      const { nom_passager, prenom_passager, numero_de_telephone, mot_de_passe, photo_passager } = req.body;
      console.log('Données reçues :', { nom_passager, prenom_passager, numero_de_telephone, mot_de_passe, photo_passager }); // Ajoutez cette ligne pour voir les données extraites
  
      const newPassager = await prisma.passager.create({
        data: {
          nom_passager,
          prenom_passager,
          numero_de_telephone,
          mot_de_passe,
          photo_passager,
        },
      });
  
      console.log('Nouveau passager créé :', newPassager);
      res.json(newPassager);
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la création du passager dans la base de données' });
    }
  });


  // ...
  router.put('/api/passager/:id',  async (req, res) => {
    try {
      const passagerId = parseInt(req.params.id, 10); // Obtenez l'ID du passager à partir des paramètres de l'URL
      console.log('Requête PUT reçue');
      console.log('Corps de la requête :', req.body);
  
      const { nom_passager, prenom_passager, numero_de_telephone, mot_de_passe, photo_passager } = req.body;
      console.log('Données reçues :', { nom_passager, prenom_passager, numero_de_telephone, mot_de_passe, photo_passager });
  
      const updatedPassager = await prisma.passager.update({
        where: { id_passager: passagerId }, // Spécifiez l'ID du passager que vous souhaitez mettre à jour
        data: {
          nom_passager,
          prenom_passager,
          numero_de_telephone,
          mot_de_passe,
          photo_passager,
        },
      });
  
      console.log('Passager mis à jour :', updatedPassager);
      res.json(updatedPassager);
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la mise à jour du passager dans la base de données' });
    }
  });


 
  router.delete('/api/passager/:id',  async (req, res) => {
    try {
      const passagerId = parseInt(req.params.id, 10); // Obtenez l'ID du passager à partir des paramètres de l'URL
      console.log('Requête DELETE reçue');
  
      const deletedPassager = await prisma.passager.delete({
        where: { id_passager: passagerId }, // Spécifiez l'ID du passager que vous souhaitez supprimer
      });
  
      console.log('Passager supprimé :', deletedPassager);
      res.json({ message: 'Passager supprimé avec succès' });
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la suppression du passager dans la base de données' });
    }
  });

  module.exports = router;
