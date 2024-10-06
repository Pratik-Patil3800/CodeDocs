const express = require('express');
const axios = require('axios');
const router = express.Router();
const {Project, User} = require("./models");
const verifyToken = require("./middleware");


require('dotenv').config();

const GITLAB_TOKEN = process.env.GITLAB_TOKEN;
const GITLAB_API_BASE_URL = process.env.GITLAB_API_BASE_URL;


const gitlabAPI = axios.create({
    baseURL: GITLAB_API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${GITLAB_TOKEN}`,
        'Content-Type': 'application/json',
    }
});



router.post('/createNewRepo',verifyToken, async (req, res) => {
    console.log("atbackend");
    const { projectName, description } = req.body;
    try {
        let existingProject = await Project.findOne({ name: projectName });

        if (existingProject) {
            return res.status(400).json({ message: 'Project already exists with the same name' });
        }

        const response = await gitlabAPI.post('/projects', {
            name: projectName,
            visibility: 'private',
        });

        const newProject = new Project({
            name: projectName,
            repo_id: response.data.id,  
            description
        });
        await newProject.save();
        const user = await User.findById(req.userId); 

        user.projects.push(newProject._id); 
        await user.save();
        res.json({ message: `Repository '${projectName}' created successfully.`, data: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Error creating repository', details: error.message });
    }
});

//delete tutorial
router.delete('/deleteRepo',verifyToken, async (req, res) => {
    const { projectId } = req.body;

    try {
        const project = await Project.findOne({ repo_id: projectId });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await gitlabAPI.delete(`/projects/${projectId}`);
        const user = await User.findById(req.userId); 

        user.projects.pull(project._id); 
        await user.save();
        await Project.deleteOne({ repo_id: projectId });
       
        res.json({ message: `Repository with ID '${projectId}' deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting repository', details: error.message });
    }
});

//add page
router.post('/addFile', async (req, res) => {
    const { projectId, filePath } = req.body;
    
    try {
        const existingProject = await Project.findOne({ repo_id: projectId });
        if(!existingProject){
            return res.status(400).json({ message: 'Project does not exists' });
        }
        const response = await gitlabAPI.post(`/projects/${projectId}/repository/files/${encodeURIComponent(filePath)}`, {
            branch: 'main',
            content:"",
            commit_message: 'Add file',
        });

        existingProject.pages.push(filePath);
        await existingProject.save();

        res.json({ message: `File '${filePath}' created successfully.`, data: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Error creating file', details: error.message });
    }
});

//delete page
router.delete('/deleteFile', async (req, res) => {
    const { projectId, filePath } = req.body;

    try {
        const existingProject = await Project.findOne({ repo_id: projectId });
        if(!existingProject){
            return res.status(400).json({ message: 'Project does not exists' });
        }
       
        const response = await gitlabAPI.delete(`/projects/${projectId}/repository/files/${encodeURIComponent(filePath)}`, {
            data: {
                branch: 'main', 
                commit_message: 'Delete file',
            }
        });

        existingProject.pages.pull(filePath);
        await existingProject.save();

        res.json({ message: `File '${filePath}' deleted successfully.`, data: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting file', details: error.message });
    }
});


//update page
router.put('/updateFile', async (req, res) => {
    const { projectId, filePath, content } = req.body;
    
    try {
        const response = await gitlabAPI.put(`/projects/${projectId}/repository/files/${encodeURIComponent(filePath)}`, {
            branch: 'main',
            content: content,
            commit_message:'Update file content',
        });

        res.json({ message: `File '${filePath}' updated successfully.`, data: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Error updating file', details: error.message });
    }
});

router.post('/getFileContent', async (req, res) => {
    const { projectId, filePath } = req.body;
    console.log(req.body)
    try {
        const response = await gitlabAPI.get(`/projects/${projectId}/repository/files/${encodeURIComponent(filePath)}`, {
            params: {
                ref: 'main' 
            }
        });

        const fileData = response.data;
        const fileContent = Buffer.from(fileData.content, 'base64').toString('utf8');

        res.json({ message: `File '${filePath}' retrieved successfully.`, content: fileContent });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving file content', details: error.message });
    }
});


//disply tutorial
router.get('/listRepos', async (req, res) => {
    try {
        const response = await gitlabAPI.get('/projects',{
            params:{
                owned:true,
            }
        })
        res.json({ message: 'Repositories retrieved successfully.', data: response.data });
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: 'Error listing repositories', details: error.message });
    }
});

//version
router.get('/retrieveVersion', async (req, res) => {
    const { projectId, commitHash } = req.query;

    try {
        const response = await gitlabAPI.get(`/projects/${projectId}/repository/commits/${commitHash}`);
        res.json({ message: `Commit '${commitHash}' retrieved successfully.`, data: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving commit', details: error.message });
    }
});


router.get('/listCommits', async (req, res) => {
    const { projectId } = req.query;

    try {
        const response = await gitlabAPI.get(`/projects/${projectId}/repository/commits`);
        res.json({ message: 'Commits retrieved successfully.', data: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Error listing commits', details: error.message });
    }
});

module.exports = router;
