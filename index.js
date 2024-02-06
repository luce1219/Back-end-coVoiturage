const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// require('dotenv').config()
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Remplacez le chemin par celui de votre fichier de configuration


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 * @swagger
 * /:
 *   get:
 *     summary: Renvoie un message de bienvenue
 *     responses:
 *       200:
 *         description: Message de bienvenue
 *         content:
 *           application/json:
 *             example:
 *               message: hello
 */

app.get('/', (req, res) => {
  res.json({ message: 'Bonjour lucette' });
});



// Middleware Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//la route conducteur
app.use('/', require('./routes/conducteur.routes'))
app.use('/', require('./routes/passager.routes'))
app.use('/', require('./routes/reservation.routes'))
app.use('/', require('./routes/trajet.routes'))

// ... (Vos middlewares actuels)
app.use((req, res, next) => {
    const event = new Date();
    console.log('AUTH TIME:', event.toString());
    next();
  });

  
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
