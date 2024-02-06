const prisma = require('../prisma/prismaClient')

/**
 * @swagger
 * /api/reservation:
 *   get:
 *     summary: Récupère la liste des réservations enregistrées
 *     responses:
 *       200:
 *         description: Liste des réservations
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 id_trajet: 1
 *                 id_passager: 1
 *                 status: ""
 *               - id: 2
 *                 id_trajet: 1
 *                 id_passager: 1
 *                 status: "Confirmed"
 */

app.get('/api/reservation', getreservation);
// Routes pour les réservations

const getreservation = async (req, res) => {
    try {
      const reservation = await prisma.reservation.findMany();
      res.json(reservation);
      console.log(reservation)
    } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la récupération des reservations depuis la base de données' });
    }
  };

/**
 * @swagger
 * /api/reservation:
 *   post:
 *     summary: Crée une nouvelle réservation
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               id_passager: 1
 *               id_trajet: 1
 *               passager:
 *                 id: 1
 *                 nom_passager: "John"
 *                 prenom_passager: "Doe"
 *                 numero_de_telephone: "123456789"
 *                 mot_de_passe: "securePassword"
 *                 photo_passager: "path/to/photo.jpg"
 *                 reservations: []
 *               trajet:
 *                 id: 1
 *                 id_conducteur: 1
 *                 destination_d_arrivee: "owendo"
 *                 destination_depart: "akanda"
 *                 heure_de_depart: "2024-01-29T17:27:00Z"
 *                 heure_d_arrivee: "2024-01-29T17:50:00Z"
 *                 prix_du_trajet: 30.5
 *                 conducteur:
 *                   id: 3
 *                   nom_conducteur: "Moussavou Mounguengui"
 *                   prenom_conducteur: "christ"
 *                   numero_de_telephone: "074647150"
 *                   modele_du_vehicule: "Car Model"
 *                   nombre_de_place_disponible: 4
 *                   photo_conducteur: "image.jpg"
 *                   photo_du_permis_de_conduire: "img"
 *                   photo_de_la_carte_crise: "image"
 *                   photo_de_la_carte_d_assurance: "photo.jpg"
 *                   trajets: []
 *                 reservations: []
 *               status: "Confirmed"
 */



  // ...
  const postreservation = async (req, res) => {
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
  };
  

  /**
 * @swagger
 * /api/reservation/{id}:
 *   put:
 *     summary: Met à jour une réservation existante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de la réservation à mettre à jour
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Réservation mise à jour avec succès
 *         content:
 *           application/json:
 *             example:
 *               id_reservation: 1
 *               id_passager: 1
 *               id_trajet: 1
 *               passager:
 *                 id_passager: 1
 *                 nom_passager: "John"
 *                 prenom_passager: "Doe"
 *                 numero_de_telephone: "123456789"
 *                 mot_de_passe: "securePassword"
 *                 photo_passager: "path/to/photo.jpg"
 *                 reservations: []
 *               trajet:
 *                 id_trajet: 1
 *                 id_conducteur: 1
 *                 destination_d_arrivee: "owendo"
 *                 destination_depart: "akanda"
 *                 heure_de_depart: "2024-01-29T17:27:00Z"
 *                 heure_d_arrivee: "2024-01-29T17:50:00Z"
 *                 prix_du_trajet: 30.5
 *                 conducteur:
 *                   id_conducteur: 3
 *                   nom_conducteur: "Moussavou Mounguengui"
 *                   prenom_conducteur: "christ"
 *                   numero_de_telephone: "074647150"
 *                   modele_du_vehicule: "Car Model"
 *                   nombre_de_place_disponible: 4
 *                   photo_conducteur: "image.jpg"
 *                   photo_du_permis_de_conduire: "img"
 *                   photo_de_la_carte_crise: "image"
 *                   photo_de_la_carte_d_assurance: "photo.jpg"
 *                   trajets: []
 *                 reservations: []
 *               status: "Confirmed"
 */

  // ...
  const putreservation = async (req, res) => {
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
  };


  /**
 * @swagger
 * /api/reservation/{id}:
 *   delete:
 *     summary: Supprime une réservation existante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de la réservation à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *         content:
 *           application/json:
 *             example:
 *               id_reservation: 1
 *               id_passager: 1
 *               id_trajet: 1
 *               passager:
 *                 id_passager: 1
 *                 nom_passager: "John"
 *                 prenom_passager: "Doe"
 *                 numero_de_telephone: "123456789"
 *                 mot_de_passe: "securePassword"
 *                 photo_passager: "path/to/photo.jpg"
 *                 reservations: []
 *               trajet:
 *                 id_trajet: 1
 *                 id_conducteur: 1
 *                 destination_d_arrivee: "owendo"
 *                 destination_depart: "akanda"
 *                 heure_de_depart: "2024-01-29T17:27:00Z"
 *                 heure_d_arrivee: "2024-01-29T17:50:00Z"
 *                 prix_du_trajet: 30.5
 *                 conducteur:
 *                   id_conducteur: 3
 *                   nom_conducteur: "Moussavou Mounguengui"
 *                   prenom_conducteur: "christ"
 *                   numero_de_telephone: "074647150"
 *                   modele_du_vehicule: "Car Model"
 *                   nombre_de_place_disponible: 4
 *                   photo_conducteur: "image.jpg"
 *                   photo_du_permis_de_conduire: "img"
 *                   photo_de_la_carte_crise: "image"
 *                   photo_de_la_carte_d_assurance: "photo.jpg"
 *                   trajets: []
 *                 reservations: []
 *               status: "Confirmed"
 */

  // ...
  const deletereservation = async (req, res) => {
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
  };

  module.exports ={
    getreservation,
    postreservation,
    putreservation,
    deletereservation
  }