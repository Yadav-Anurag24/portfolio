const Project = require('../models/projectModel'); // Import the Model
const staticProjects = require('../data/projects'); // Static fallback data
const { getIsConnected } = require('../config/db');

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = async (req, res) => {
    try {
        if (getIsConnected()) {
            const projects = await Project.find({});
            return res.json(projects);
        }
        // Fallback to static data when MongoDB is not connected
        res.json(staticProjects);
    } catch (error) {
        // If DB query fails, still try static fallback
        console.error('[projects] DB error, using static fallback:', error.message);
        res.json(staticProjects);
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
const getProjectById = async (req, res) => {
    try {
        if (getIsConnected()) {
            const project = await Project.findOne({ id: req.params.id });
            if (project) return res.json(project);
            return res.status(404).json({ message: 'Project not found' });
        }
        // Fallback to static data
        const project = staticProjects.find(p => p.id === parseInt(req.params.id));
        if (project) return res.json(project);
        res.status(404).json({ message: 'Project not found' });
    } catch (error) {
        console.error('[projects] DB error, using static fallback:', error.message);
        const project = staticProjects.find(p => p.id === parseInt(req.params.id));
        if (project) return res.json(project);
        res.status(404).json({ message: 'Project not found' });
    }
};

module.exports = {
    getProjects,
    getProjectById
};