const prisma = require('../prisma/prismaClient')

// Routes pour les trajets

/**
 * @swagger
 * /api/trajet:
 *   get:
 *     summary: Récupère la liste des réservations enregistrées
 *     responses:
 *       200:
 *         description: Liste des réservations
 *         content:
 *           application/json:
 *             example:
 *               - id_trajet: 1
 *                 id_conducteur: 1
 *                 destination_d_arrivee: "owendo"
 *                 destination_depart: "akanda"
 *                 heure_de_depart: "2024-01-29T00:17:27.000Z"
 *                 heure_d_arrivee: "2024-01-29T00:17:50.000Z"
 *                 prix_du_trajet: 30.5
 *                 conducteur:
 *                   id_conducteur: 1
 *                   nom_conducteur: "NZIEGUI"
 *                   prenom_conducteur: "Laurent"
 *                   numero_de_telephone: "066250250"
 *                   modele_du_vehicule: "Car Model"
 *                   nombre_de_place_disponible: 4
 *                   photo_conducteur: "image.jpg"
 *                   photo_du_permis_de_conduire: "img"
 *                   photo_de_la_carte_crise: "image"
 *                   photo_de_la_carte_d_assurance: "photo.jpg"
 *                 reservations:
 *                   - id_reservation: 1
 *                     id_trajet: 1
 *                     id_passager: 1
 *                     status: ""
 *                   - id_reservation: 2
 *                     id_trajet: 1
 *                     id_passager: 1
 *                     status: "Confirmed"
 *               - id_trajet: 2
 *                 id_conducteur: 4
 *                 destination_d_arrivee: "plein ciel"
 *                 destination_depart: "ancien sobraga"
 *                 heure_de_depart: "2024-01-29T00:19:04.000Z"
 *                 heure_d_arrivee: "2024-01-29T00:20:00.000Z"
 *                 prix_du_trajet: 20.5
 *                 conducteur:
 *                   id_conducteur: 4
 *                   nom_conducteur: "MBOULA"
 *                   prenom_conducteur: "Mitch"
 *                   numero_de_telephone: "066662503"
 *                   modele_du_vehicule: "Toyota"
 *                   nombre_de_place_disponible: 3
 *                   photo_conducteur: "image.jpg"
 *                   photo_du_permis_de_conduire: "img"
 *                   photo_de_la_carte_crise: "image"
 *                   photo_de_la_carte_d_assurance: "photo.jpg"
 *                 reservations: []
 *               - id_trajet: 3
 *                 id_conducteur: 4
 *                 destination_d_arrivee: "plein ciel"
 *                 destination_depart: "ancien sobraaga"
 *                 heure_de_depart: "2024-01-29T19:04:00.000Z"
 *                 heure_d_arrivee: "2024-01-29T20:00:00.000Z"
 *                 prix_du_trajet: 20.5
 *                 conducteur:
 *                   id_conducteur: 4
 *                   nom_conducteur: "MBOULA"
 *                   prenom_conducteur: "Mitch"
 *                   numero_de_telephone: "066662503"
 *                   modele_du_vehicule: "Toyota"
 *                   nombre_de_place_disponible: 3
 *                   photo_conducteur: "image.jpg"
 *                   photo_du_permis_de_conduire: "img"
 *                   photo_de_la_carte_crise: "image"
 *                   photo_de_la_carte_d_assurance: "photo.jpg"
 *                 reservations: []
 *               - id_trajet: 4
 *                 id_conducteur: 4
 *                 destination_d_arrivee: "pk chateau"
 *                 destination_depart: "gros bouket"
 *                 heure_de_depart: "2024-01-29T19:04:00.000Z"
 *                 heure_d_arrivee: "2024-01-29T20:00:00.000Z"
 *                 prix_du_trajet: 20.5
 *                 conducteur:
 *                   id_conducteur: 4
 *                   nom_conducteur: "MBOULA"
 *                   prenom_conducteur: "Mitch"
 *                   numero_de_telephone: "066662503"
 *                   modele_du_vehicule: "Toyota"
 *                   nombre_de_place_disponible: 3
 *                   photo_conducteur: "image.jpg"
 *                   photo_du_permis_de_conduire: "img"
 *                   photo_de_la_carte_crise: "image"
 *                   photo_de_la_carte_d_assurance: "photo.jpg"
 *                 reservations: []
 */



const gettrajets = async (req, res) => {
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
  };

  // ...

/**
 * @swagger
 * /api/trajet:
 *   post:
 *     summary: Crée un nouveau trajet
 *     responses:
 *       201:
 *         description: Trajet créé avec succès
 *         content:
 *           application/json:
 *             example:
 *               id_trajet: 1
 *               id_conducteur: 1
 *               destination_d_arrivee: "owendo"
 *               destination_depart: "akanda"
 *               heure_de_depart: "2024-01-29T00:17:27.000Z"
 *               heure_d_arrivee: "2024-01-29T00:17:50.000Z"
 *               prix_du_trajet: 30.5
 *               conducteur:
 *                 id_conducteur: 1
 *                 nom_conducteur: "NZIEGUI"
 *                 prenom_conducteur: "Laurent"
 *                 numero_de_telephone: "066250250"
 *                 modele_du_vehicule: "Car Model"
 *                 nombre_de_place_disponible: 4
 *                 photo_conducteur: "image.jpg"
 *                 photo_du_permis_de_conduire: "img"
 *                 photo_de_la_carte_crise: "image"
 *                 photo_de_la_carte_d_assurance: "photo.jpg"
 *               reservations:
 *                 - id_reservation: 1
 *                   id_trajet: 1
 *                   id_passager: 1
 *                   status: ""
 *                 - id_reservation: 2
 *                   id_trajet: 1
 *                   id_passager: 1
 *                   status: "Confirmed"
 */




  const posttrajet =  async (req, res) => {
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
  };

  // ...

/**
 * @swagger
 * /api/trajet/{id}:
 *   put:
 *     summary: Met à jour un trajet existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du trajet à mettre à jour
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trajet mis à jour avec succès
 *         content:
 *           application/json:
 *             example:
 *               id_trajet: 1
 *               id_conducteur: 1
 *               destination_d_arrivee: "owendo"
 *               destination_depart: "akanda"
 *               heure_de_depart: "2024-01-29T00:17:27.000Z"
 *               heure_d_arrivee: "2024-01-29T00:17:50.000Z"
 *               prix_du_trajet: 30.5
 *               conducteur:
 *                 id_conducteur: 1
 *                 nom_conducteur: "NZIEGUI"
 *                 prenom_conducteur: "Laurent"
 *                 numero_de_telephone: "066250250"
 *                 modele_du_vehicule: "Car Model"
 *                 nombre_de_place_disponible: 4
 *                 photo_conducteur: "image.jpg"
 *                 photo_du_permis_de_conduire: "img"
 *                 photo_de_la_carte_crise: "image"
 *                 photo_de_la_carte_d_assurance: "photo.jpg"
 *               reservations:
 *                 - id_reservation: 1
 *                   id_trajet: 1
 *                   id_passager: 1
 *                   status: ""
 *                 - id_reservation: 2
 *                   id_trajet: 1
 *                   id_passager: 1
 *                   status: "Confirmed"
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             id_conducteur: 1
 *             destination_d_arrivee: "owendo"
 *             destination_depart: "akanda"
 *             heure_de_depart: "2024-01-29T00:17:27.000Z"
 *             heure_d_arrivee: "2024-01-29T00:17:50.000Z"
 *             prix_du_trajet: 30.5
 */

  const puttrajet = async (req, res) => {
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
  };


  // ...

  /**
 * @swagger
 * /api/trajet/{id}:
 *   delete:
 *     summary: Supprime un trajet existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du trajet à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trajet supprimé avec succès
 *         content:
 *           application/json:
 *             example:
 *               id_trajet: 1
 *               id_conducteur: 1
 *               destination_d_arrivee: "owendo"
 *               destination_depart: "akanda"
 *               heure_de_depart: "2024-01-29T00:17:27.000Z"
 *               heure_d_arrivee: "2024-01-29T00:17:50.000Z"
 *               prix_du_trajet: 30.5
 *               conducteur:
 *                 id_conducteur: 1
 *                 nom_conducteur: "NZIEGUI"
 *                 prenom_conducteur: "Laurent"
 *                 numero_de_telephone: "066250250"
 *                 modele_du_vehicule: "Car Model"
 *                 nombre_de_place_disponible: 4
 *                 photo_conducteur: "image.jpg"
 *                 photo_du_permis_de_conduire: "img"
 *                 photo_de_la_carte_crise: "image"
 *                 photo_de_la_carte_d_assurance: "photo.jpg"
 *               reservations:
 *                 - id_reservation: 1
 *                   id_trajet: 1
 *                   id_passager: 1
 *                   status: ""
 *                 - id_reservation: 2
 *                   id_trajet: 1
 *                   id_passager: 1
 *                   status: "Confirmed"
 */

  const deletetrajet = async (req, res) => {
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
  };

  module.exports = {
    gettrajets,
    posttrajet,
    puttrajet,
    deletetrajet

  }