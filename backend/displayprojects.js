const express = require('express');
const router = express.Router();
const {Project, User} = require("./models");
const verifyToken = require("./middleware");


router.get('/allprojects', async (req, res) => {
    try {
        const projects = await Project.find({}, 'name repo_id description');
        res.json({ projects });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving projects', details: error.message });
    }
});


router.get('/myprojects', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('projects', 'name repo_id description');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ projects: user.projects });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user projects', details: error.message });
    }
});

router.post('/listpages', async (req, res) => {
    const { repo_id } = req.body;

    try {
        const project = await Project.findOne({ repo_id }, 'pages');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ pages: project.pages });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving project pages', details: error.message });
    }
});





module.exports = router;
