//Importation d'express js
const express = require('express')
const router = express.Router()
//Import de prisma
const prisma = require('../prisma/prismaClient')

// Routes pour les trajets

router.get('/api/trajets', async (req, res) => {
    try {
      const trajets = await prisma.trajet.findMany({
        include: {
          conducteur: true,
          reservations: true,
        },
      });
  
      res.json(trajets);
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la récupération des trajets depuis la base de données' });
    }
  });

  // ...
  router.post('/api/trajet',  async (req, res) => {
    try {
      console.log('Requête POST reçue');
      console.log('Corps de la requête :', req.body);
  
      const {
        id_conducteur,
        destination_d_arrivee,
        destination_depart,
        heure_de_depart,
        heure_d_arrivee,
        prix_du_trajet,
        conducteur,
      } = req.body;
  
      // Vérifier si le conducteur existe
      const conducteurExist = await prisma.conducteur.findUnique({
        where: { id_conducteur: parseInt(id_conducteur, 10) },
      });
  
      if (!conducteurExist) {
        return res.status(400).json({ erreur: 'Le conducteur n\'existe pas' });
      }
  
      const newTrajet = await prisma.trajet.create({
        data: {
          destination_d_arrivee,
          destination_depart,
          heure_de_depart: new Date(heure_de_depart),
          heure_d_arrivee: new Date(heure_d_arrivee),
          prix_du_trajet,
          conducteur: { connect: { id_conducteur: parseInt(id_conducteur, 10) } },
        },
      });
  
      console.log('Nouveau trajet créé :', newTrajet);
      res.status(201).json(newTrajet);
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la création du trajet dans la base de données' });
    }
  });

  // ...
  router.put('/api/trajet/:id', async (req, res) => {
    try {
      const trajetId = parseInt(req.params.id, 10);
      console.log('Requête PUT reçue');
      console.log('Corps de la requête :', req.body);
  
      const {
        id_conducteur,
        destination_d_arrivee,
        destination_depart,
        heure_de_depart,
        heure_d_arrivee,
        prix_du_trajet,
      } = req.body;
  
      // Vérifier si le trajet existe
      const trajetExist = await prisma.trajet.findUnique({
        where: { id_trajet: trajetId },
      });
  
      if (!trajetExist) {
        return res.status(404).json({ erreur: 'Trajet introuvable' });
      }
  
      // Vérifier si le conducteur existe
      const conducteurExist = await prisma.conducteur.findUnique({
        where: { id_conducteur: parseInt(id_conducteur, 10) },
      });
  
      if (!conducteurExist) {
        return res.status(400).json({ erreur: 'Le conducteur n\'existe pas' });
      }
  
      const updatedTrajet = await prisma.trajet.update({
        where: { id_trajet: trajetId },
        data: {
          id_conducteur: parseInt(id_conducteur, 10),
          destination_d_arrivee,
          destination_depart,
          heure_de_depart: new Date(heure_de_depart),
          heure_d_arrivee: new Date(heure_d_arrivee),
          prix_du_trajet,
        },
      });
  
      console.log('Trajet mis à jour :', updatedTrajet);
      res.json(updatedTrajet);
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la mise à jour du trajet dans la base de données' });
    }
  });


  // ...
  router.delete('/api/trajet/:id', async (req, res) => {
    try {
      const trajetId = parseInt(req.params.id, 10);
      console.log('Requête DELETE reçue');
  
      // Vérifier si le trajet existe
      const trajetExist = await prisma.trajet.findUnique({
        where: { id_trajet: trajetId },
      });
  
      if (!trajetExist) {
        return res.status(404).json({ erreur: 'Trajet introuvable' });
      }
  
      // Supprimer le trajet
      const deletedTrajet = await prisma.trajet.delete({
        where: { id_trajet: trajetId },
      });
  
      console.log('Trajet supprimé :', deletedTrajet);
      res.json(deletedTrajet);
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la suppression du trajet dans la base de données' });
    }
  });

  module.exports = router;
  