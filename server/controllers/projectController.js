const Project = require('../models/projectModel'); // Import the Model

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
const getProjectById = async (req, res) => {
    try {
        // Find by the custom 'id' field we set, not the MongoDB _id
        const project = await Project.findOne({ id: req.params.id });
        
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    getProjectById
};