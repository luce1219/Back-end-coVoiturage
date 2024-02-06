
//Importation d'express js
const express = require('express')
const router = express.Router()
//Import de prisma
const prisma = require('../prisma/prismaClient')


// Routes pour les réservations

router.get('/api/reservation', async (req, res) => {
    try {
      const reservation = await prisma.reservation.findMany();
      res.json(reservation);
      console.log(reservation)
    } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la récupération des reservations depuis la base de données' });
    }
  });

  // ...
  router.post('/api/reservation', async (req, res) => {
    try {
      console.log('Requête POST reçue');
      console.log('Corps de la requête :', req.body);
  
      const { id_passager, trajet, status } = req.body;
      console.log('Données reçues :', { id_passager, trajet, status });
  
      // Vérifier si le passager et le trajet existent
      const passagerExist = await prisma.passager.findUnique({
        where: { id_passager: parseInt(id_passager, 10) },
      });
  
      const trajetExist = await prisma.trajet.findUnique({
        where: { id_trajet: trajet.id_trajet },
      });
  
      if (!passagerExist || !trajetExist) {
        return res.status(400).json({ erreur: 'Passager ou trajet inexistant' });
      }
  
      const newReservation = await prisma.reservation.create({
        data: {
          id_passager: parseInt(id_passager, 10),
          id_trajet: trajet.id_trajet,
          status,
        },
      });
  
      console.log('Nouvelle réservation créée :', newReservation);
      res.status(201).json(newReservation);
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la création de la réservation dans la base de données' });
    }
  });
  


  // ...
  router.put('/api/reservation/:id', async (req, res) => {
    try {
      const reservationId = parseInt(req.params.id, 10);
      console.log('Requête PUT reçue');
      console.log('Corps de la requête :', req.body);
  
      const { id_passager, trajet, status } = req.body;
      console.log('Données reçues :', { id_passager, trajet, status });
  
      // Vérifier si la réservation existe
      const reservationExist = await prisma.reservation.findUnique({
        where: { id_reservation: reservationId },
      });
  
      if (!reservationExist) {
        return res.status(404).json({ erreur: 'Réservation introuvable' });
      }
  
      // Vérifier si le passager et le trajet existent
      const passagerExist = await prisma.passager.findUnique({
        where: { id_passager: parseInt(id_passager, 10) },
      });
  
      const trajetExist = await prisma.trajet.findUnique({
        where: { id_trajet: trajet.id_trajet },
      });
  
      if (!passagerExist || !trajetExist) {
        return res.status(400).json({ erreur: 'Passager ou trajet inexistant' });
      }
  
      const updatedReservation = await prisma.reservation.update({
        where: { id_reservation: reservationId },
        data: {
          id_passager: parseInt(id_passager, 10),
          id_trajet: trajet.id_trajet,
          status,
        },
      });
  
      console.log('Réservation mise à jour :', updatedReservation);
      res.json(updatedReservation);
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la mise à jour de la réservation dans la base de données' });
    }
  });

  // ...
  router.delete('/api/reservation/:id', async (req, res) => {
    try {
      const reservationId = parseInt(req.params.id, 10);
      console.log('Requête DELETE reçue');
  
      // Vérifier si la réservation existe
      const reservationExist = await prisma.reservation.findUnique({
        where: { id_reservation: reservationId },
      });
  
      if (!reservationExist) {
        return res.status(404).json({ erreur: 'Réservation introuvable' });
      }
  
      // Supprimer la réservation
      const deletedReservation = await prisma.reservation.delete({
        where: { id_reservation: reservationId },
      });
  
      console.log('Réservation supprimée :', deletedReservation);
      res.json(deletedReservation);
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la suppression de la réservation dans la base de données' });
    }
  });

  module.exports = router;

  