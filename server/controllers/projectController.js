const projects = require('../data/projects');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = (req, res) => {
    // In a real app, this is where you would await Project.find({}) from Mongoose
    res.status(200).json(projects);
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = (req, res) => {
    const project = projects.find((p) => p.id === parseInt(req.params.id));
    
    if (project) {
        res.status(200).json(project);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};

module.exports = {
    getProjects,
    getProjectById
};