import express from 'express';
import { chat } from '../controllers/chatController.js';
import { createProject, deleteProject, getProject, getPublicProject, listProjects, publishProject, updateProjectFiles } from '../controllers/projectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const projectRouter = express.Router();

projectRouter.get("/public/:id", getPublicProject);

projectRouter.use(authMiddleware);
projectRouter.post("/", createProject);
projectRouter.get("/", listProjects);
projectRouter.get("/:id", getProject);
projectRouter.delete("/:id", deleteProject);
projectRouter.put("/:id/files", updateProjectFiles);
projectRouter.post("/:id/publish", publishProject);

// Chat
projectRouter.post("/:id/chat", chat);

export default projectRouter;