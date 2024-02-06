const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon API',
      version: '1.0.0',
      description: "Documentation de l'API utilisant Swagger",
    },
  },
  apis: ['index.js', './controllers/passagerController.js', './controllers/conducteurController.js', './controllers/reservationController.js', './controllers/trajetController.js' ],  // Spécifiez le chemin vers vos fichiers de routes
};



const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
