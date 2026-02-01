const express = require('express');
const router = express.Router();
const { getProjects, getProjectById } = require('../controllers/projectController');

// Define the routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

module.exports = router;