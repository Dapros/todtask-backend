import { Router } from "express";
import { body, param} from 'express-validator'
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router = Router()

// POST
router.post('/', 
  //validacion
  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es Obligatorio'),
  body('clientName')
    .notEmpty()
    .withMessage('El nombre del cliente es Obligatorio'),
  body('description')
    .notEmpty()
    .withMessage('LA descripcion del proyecto es obligatoria'),
  handleInputErrors,
  ProjectController.createProject
)

// GET
router.get('/', ProjectController.getAllProjects)

// GET by ID
router.get('/:id', 
  param('id').isMongoId().withMessage('ID no valido'),
  handleInputErrors,
  ProjectController.getProjectById
)

// PUT por Id, actualizar
router.put('/:id', 
  param('id').isMongoId().withMessage('ID no valido'),
  //validacion
  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es Obligatorio'),
  body('clientName')
    .notEmpty()
    .withMessage('El nombre del cliente es Obligatorio'),
  body('description')
    .notEmpty()
    .withMessage('LA descripcion del proyecto es obligatoria'),
  handleInputErrors,
  ProjectController.updateProject
)

// DELETE por ID
router.delete('/:id', 
  param('id').isMongoId().withMessage('ID no valido'),
  handleInputErrors,
  ProjectController.deleteProject
)

/** Rutas de las tareas - se hacen aqui porque dependen del proyecto */

// POST - Crear tareas
router.post('/:projectId/tasks',
  // validacion de que el proyecto exista
  validateProjectExists,
  // agregar validaciones
  body('name')
    .notEmpty()
    .withMessage('El nombre de la tarea es Obligatorio'),
  body('description')
    .notEmpty()
    .withMessage('La descripcion de la tarea es obligatoria'),
  handleInputErrors,
  TaskController.createTask
)

// GET - Traer tasks
router.get('/:projectId/tasks', 
  validateProjectExists,
  TaskController.getProjectTasks
)

// GET - Traer task unica por id
router.get('/:projectId/tasks/:taskId', 
  validateProjectExists,
  TaskController.getTaskById
)

export default router