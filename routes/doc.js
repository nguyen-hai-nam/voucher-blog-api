import express from 'express';
import swaggerUi from 'swagger-ui-express';

import openapiSpecification from '../config/swagger.js';

const router = express.Router();

router.use('/user', swaggerUi.serve);
router.get('/user', (req, res) => {
  res.send(swaggerUi.generateHTML(openapiSpecification.userModule));
});

router.use('/business', swaggerUi.serve);
router.get('/business', (req, res) => {
  res.send(swaggerUi.generateHTML(openapiSpecification.businessModule));
});

router.use('/admin', swaggerUi.serve);
router.get('/admin', (req, res) => {
  res.send(swaggerUi.generateHTML(openapiSpecification.adminModule));
});
export default router;