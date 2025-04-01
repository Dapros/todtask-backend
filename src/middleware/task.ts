// todo lo relacionado con los estados de las tareas
import type { Request, Response, NextFunction } from 'express'
import Task, { ITask } from '../models/Task'

declare global {
  namespace Express {
    interface Request {
      task: ITask
    }
  }
}

export async function taskExists(req: Request, res: Response, next: NextFunction) {
  try {
    const { taskId } = req.params // extrae taskId de los parametros del reques desde routes
    const task = await Task.findById(taskId) //// si encuentra por Id el mismo del parametro lo almacena en task
    if(!task){ // sino existe lanza error y un status 404
      const error = new Error('Tarea no encontrado')
      res.status(404).json({error: error.message})
      return 
    }
    req.task = task
    next()
  } catch (error) {
    res.status(500).json({error: 'Hubo un error'})
  }
}

export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
  if(req.task.project.toString() !== req.project.id.toString()){
    const error = new Error('Accion no valida')
    res.status(400).json({error: error.message})
    return
  }
  // console.log(task.project.toString()) // muestra el id como objectId - se transforma a string con toString
  // console.log(req.project.id)
  next()
}