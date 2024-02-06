
const prisma = require('../prisma/prismaClient')


/**
 * @swagger
 * /api/conducteur:
 *   get:
 *     summary: Récupère la liste des conducteur enregistrés
 *     responses:
 *       200:
 *         description: Liste des Conducteur
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nom_conducteur: Lengouba
 *                 prenom_conducteur: calin
 *                 numero_de_telephone: +241 74 52 98 05
 *                 modele_du_vehicule: AB 502  
 *                 nombre_de_place_disponible: 4
 *                 photo_conducteur: image.jpg
 *                 photo_du_permis_de_conduire: img.jpg
 *                 carte_crise_et_d_assurance: ABht124
 */

const getConducteur = async (req, res)=>{
    try {
        const conducteur = await prisma.conducteur.findMany();
        res.json(conducteur);
      } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: 'Erreur lors de la récupération des passagers depuis la base de données' });
      }
}


/**
 * @swagger
 * /api/conducteur:
 *   post:
 *     summary: Crée un nouveau conducteur
 *     responses:
 *       200:
 *         description: Conducteur créé avec succès
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nom_conducteur: Lengouba
 *               prenom_conducteur: Calin
 *               numero_de_telephone: +241 74 52 98 05
 *               modele_du_vehicule: AB 502  
 *               nombre_de_place_disponible: 4
 *               photo_conducteur: image.jpg
 *               photo_du_permis_de_conduire: img.jpg
 *               carte_crise_et_d_assurance: ABht124
 */


  // ...
  const postConducteur = async (req, res) => {
    try {
      console.log('Requête POST reçue');
      console.log('Corps de la requête :', req.body);
  
      const { nom_conducteur, prenom_conducteur, numero_de_telephone, modele_du_vehicule, nombre_de_place_disponible, photo_conducteur, photo_du_permis_de_conduire,  photo_de_la_carte_crise, photo_de_la_carte_d_assurance } = req.body;
  
      console.log('Données reçues :', { nom_conducteur, prenom_conducteur, numero_de_telephone, modele_du_vehicule, nombre_de_place_disponible, photo_conducteur, photo_du_permis_de_conduire,  photo_de_la_carte_crise, photo_de_la_carte_d_assurance });
  
      const newConducteur = await prisma.conducteur.create({
        data: {
          nom_conducteur,
          prenom_conducteur,
          numero_de_telephone,
          modele_du_vehicule,
          nombre_de_place_disponible,
          photo_conducteur,
          photo_du_permis_de_conduire, // Utilisez le même nom ici
          photo_de_la_carte_crise,
          photo_de_la_carte_d_assurance,
        },
      });
  
      console.log('Nouveau conducteur créé :', newConducteur);
      res.json(newConducteur);
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la création du conducteur dans la base de données' });
    }
  };


  
/**
 * @swagger
 * /api/conducteur/{id}:
 *   put:
 *     summary: Met à jour un conducteur existant
 *     responses:
 *       200:
 *         description: Conducteur mis à jour avec succès
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nom_conducteur: Lengouba
 *               prenom_conducteur: Calin
 *               numero_de_telephone: +241 74 52 98 05
 *               modele_du_vehicule: AB 502  
 *               nombre_de_place_disponible: 4
 *               photo_conducteur: image.jpg
 *               photo_du_permis_de_conduire: img.jpg
 *               carte_crise_et_d_assurance: ABht124
 */


  // ...
  const putConducteur = async (req, res) => {
    try {
      const conducteurId = parseInt(req.params.id, 10); // Obtenez l'ID du conducteur à partir des paramètres de l'URL
      console.log('Requête PUT reçue');
      console.log('Corps de la requête :', req.body);
  
      const {
        nom_conducteur,
        prenom_conducteur,
        numero_de_telephone,
        modele_du_vehicule,
        nombre_de_place_disponible,
        photo_conducteur,
        photo_du_permis_de_conduire,
        photo_de_la_carte_crise,
        photo_de_la_carte_d_assurance, // Utilisez le même nom ici
      } = req.body;
  
      console.log('Données reçues :', {
        nom_conducteur,
        prenom_conducteur,
        numero_de_telephone,
        modele_du_vehicule,
        nombre_de_place_disponible,
        photo_conducteur,
        photo_du_permis_de_conduire,
        photo_de_la_carte_crise,
        photo_de_la_carte_d_assurance,
      });
  
      const updatedConducteur = await prisma.conducteur.update({
        where: { id_conducteur: conducteurId }, // Spécifiez l'ID du conducteur que vous souhaitez mettre à jour
        data: {
          nom_conducteur,
          prenom_conducteur,
          numero_de_telephone,
          modele_du_vehicule,
          nombre_de_place_disponible,
          photo_conducteur,
          photo_du_permis_de_conduire,
          photo_de_la_carte_crise,
          photo_de_la_carte_d_assurance,
        },
      });
  
      console.log('Conducteur mis à jour :', updatedConducteur);
      res.json(updatedConducteur);
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la mise à jour du conducteur dans la base de données' });
    }
  };

  /**
 * @swagger
 * /api/conducteur/{id}:
 *   delete:
 *     summary: Supprime un conducteur existant
 *     responses:
 *       200:
 *         description: Conducteur supprimé avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: Conducteur supprimé avec succès
 */

  // ...
  const deleteConducteur = async (req, res) => {
    try {
      const conducteurId = parseInt(req.params.id, 10); // Obtenez l'ID du conducteur à partir des paramètres de l'URL
      console.log('Requête DELETE reçue');
  
      const deletedConducteur = await prisma.conducteur.delete({
        where: { id_conducteur: conducteurId }, // Spécifiez l'ID du conducteur que vous souhaitez supprimer
      });
  
      console.log('conducteur supprimé :', deletedConducteur);
      res.json({ message: 'conducteur supprimé avec succès' });
    } catch (error) {
      console.error('Erreur Prisma :', error);
      res.status(500).json({ erreur: 'Erreur lors de la suppression du conducteur dans la base de données' });
    }
  };


  module.exports = {
    getConducteur,
    postConducteur,
    putConducteur,
    deleteConducteur
  }

