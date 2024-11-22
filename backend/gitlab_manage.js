const express = require('express');
const router = express.Router();
const { Project, User } = require('./models');
const verifyToken = require('./middleware');

// Create a new project
router.post('/createNewProject', verifyToken, async (req, res) => {
    const { projectName, description } = req.body;

    try {
        const existingProject = await Project.findOne({ name: projectName });

        if (existingProject) {
            return res.status(400).json({ message: 'Project already exists with the same name' });
        }

        const newProject = new Project({
            name: projectName,
            repo_id: `${projectName}-${Date.now()}`,
            description,
            pages: [],
        });
        await newProject.save();

        const user = await User.findById(req.userId);
        user.projects.push(newProject._id);
        await user.save();

        res.json({ message: `Project '${projectName}' created successfully.`, project: newProject });
    } catch (error) {
        res.status(500).json({ error: 'Error creating project', details: error.message });
    }
});

// Delete a project
router.delete('/deleteProject', verifyToken, async (req, res) => {
    const { projectId } = req.body;

    try {
        const project = await Project.findOne({ repo_id: projectId });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const user = await User.findById(req.userId);
        user.projects.pull(project._id);
        await user.save();
        await Project.deleteOne({ _id: projectId });

        res.json({ message: `Project '${projectId}' deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting project', details: error.message });
    }
});

// Add a page
router.post('/addPage', async (req, res) => {
    const { projectId, pageName } = req.body;
    console.log(req.body);
    try {
        const project = await Project.findOne({ repo_id: projectId });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        console.log(project);
        project.pages.push({ name: pageName,  content: "" });
        await project.save();

        res.json({ message: `Page '${pageName}' added successfully.` });
    } catch (error) {
        res.status(500).json({ error: 'Error adding page', details: error.message });
    }
});

// Update a page
router.put('/updatePage', async (req, res) => {
    const { projectId, pageName, content } = req.body;

    try {
        const project = await Project.findOne({ repo_id: projectId });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const page = project.pages.find((p) => p.name === pageName);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        page.content = content;
        await project.save();

        res.json({ message: `Page '${pageName}' updated successfully.` });
    } catch (error) {
        res.status(500).json({ error: 'Error updating page', details: error.message });
    }
});

// Delete a page
router.delete('/deletePage', async (req, res) => {
    const { projectId, pageName } = req.body;

    try {
        const project = await Project.findOne({ repo_id: projectId });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.pages = project.pages.filter((p) => p.name !== pageName);
        await project.save();

        res.json({ message: `Page '${pageName}' deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting page', details: error.message });
    }
});

// Get content of a page
router.post('/getPageContent', async (req, res) => {
    const { projectId, pageName } = req.body;

    try {
        const project = await Project.findOne({ repo_id: projectId });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const page = project.pages.find((p) => p.name === pageName);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        res.json({ message: `Page '${pageName}' retrieved successfully.`, content: page.content });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving page content', details: error.message });
    }
});

// List all projects
router.get('/listProjects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json({ message: 'Projects retrieved successfully.', projects });
    } catch (error) {
        res.status(500).json({ error: 'Error listing projects', details: error.message });
    }
});

module.exports = router;
