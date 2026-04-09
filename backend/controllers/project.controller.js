const Project = require("../models/project.model");

async function createProject(req, res) {
    try {

        const { title, description, techStack, teamSize, members, status, githubLink } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newProject = new Project({
            title,
            description,
            techStack,
            teamSize,
            members,
            status,
            githubLink,
            owner: req.user.id
        });

        await newProject.save();

        res.status(201).json({
            message: "Project created successfully",
            project: newProject
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}


async function getAllProjects(req, res) {
    try {

        const projects = await Project
            .find()
            .populate("owner", "name email")
            .populate("members", "name email");

        res.status(200).json({
            message: "Projects fetched successfully",
            projects
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}


async function getProjectById(req, res) {
    try {

        const { id } = req.params;

        const project = await Project
            .findById(id)
            .populate("owner", "name email")
            .populate("members", "name email");

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({
            message: "Project fetched successfully",
            project
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}


async function getProjectForOwner(req, res) {
    try {

        const projects = await Project
            .find({ owner: req.user.id })
            .populate("members", "name email");

        res.status(200).json({
            message: "Owner projects fetched",
            projects
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}


async function joinProject(req, res) {
    try {

        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.members.includes(req.user.id)) {
            return res.status(400).json({ message: "Already joined project" });
        }

        if (project.members.length >= project.teamSize) {
            return res.status(400).json({ message: "Project team is full" });
        }

        project.members.push(req.user.id);

        await project.save();

        res.status(200).json({
            message: "Joined project successfully",
            project
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}


async function leaveProject(req, res) {
    try {

        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.members = project.members.filter(
            member => member.toString() !== req.user.id
        );

        await project.save();

        res.status(200).json({
            message: "Left project successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}


async function deleteProject(req, res) {
    try {

        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Only owner can delete project" });
        }

        await Project.findByIdAndDelete(id);

        res.status(200).json({
            message: "Project deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}


module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    getProjectForOwner,
    joinProject,
    leaveProject,
    deleteProject
};