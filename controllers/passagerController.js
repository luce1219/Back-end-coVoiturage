const prisma = require('../prisma/prismaClient')
/**
 * @swagger
 * /api/passager:
 *   get:
 *     summary: Récupérer tous les passagers
 *     description: Récupérer la liste de tous les passagers enregistrés.
 *     responses:
 *       '200':
 *         description: Succès
 *         content:
 *           application/json:
 *             example:
 *               message: Liste des passagers récupérée avec succès
 *       '500':
 *         description: Erreur du serveur
 */
app.get('/api/passager', getpassager);




// Routes pour les passager
const getpassager = async (req, res) => {
    try {
      const passagers = await prisma.passager.findMany();
      res.json(passagers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la récupération des passagers depuis la base de données' });
    }
  };


/**
 * @swagger
 * /api/passager:
 *   post:
 *     summary: Crée un nouveau passager
 *     responses:
 *       200:
 *         description: Nouveau passager créé
 *         content:
 *           application/json:
 *             example:
 *               id: 10
 *               nom_passager: MBA ALLOGO
 *               prenom_passager: benjamin
 *               numero_de_telephone: 066948438
 *               mot_de_passe: 1234
 *               photo_passager: image.jpg
 */
app.post('/api/passager', postpassager);
  // ...
  const postpassager = async (req, res) => {
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
  };


/**
 * @swagger
 * /api/passager/{id}:
 *   put:
 *     summary: Met à jour un passager existant
 *     responses:
 *       200:
 *         description: Passager mis à jour
 *         content:
 *           application/json:
 *             example:
 *               id: 10
 *               nom_passager: MBA ALLOGO
 *               prenom_passager: benjamin
 *               numero_de_telephone: 066948438
 *               mot_de_passe: 1234
 *               photo_passager: image.jpg
 */

  // ...
  const putpassager =  async (req, res) => {
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
  };

/**
 * @swagger
 * /api/passager/{id}:
 *   delete:
 *     summary: Supprime un passager existant
 *     responses:
 *       200:
 *         description: Passager supprimé
 *         content:
 *           application/json:
 *             example:
 *               message: Passager supprimé avec succès
 */

 
  const deletepassager =  async (req, res) => {
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
  };

  module.exports = {
    getpassager,
    postpassager,
    putpassager,
    deletepassager
  }
