const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth.middleware');
const { createProject, getAllProjects, getProjectForOwner, getProjectById, joinProject, leaveProject, deleteProject } = require('../controllers/project.controller')

router.post("/create", isAuth, createProject);
router.get("/", getAllProjects);
router.get("/owner", isAuth, getProjectForOwner);
router.get("/:id", getProjectById);
router.post("/:id/join", isAuth, joinProject);
router.post("/:id/leave", isAuth, leaveProject);
router.delete("/:id", isAuth, deleteProject);

module.exports = router