import type { Request, Response } from 'express'
import Task from '../models/Task'


export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    
    try {
      const task = new Task(req.body)
      task.project = req.project.id // asignar a project de task, el valor que tiene project.id
      req.project.tasks.push(task.id) // asignar task de project al arreglo para que almacene las id de las tareas
      // se ejecuta si todos los promps se cumplen
      await Promise.allSettled([task.save(), req.project.save()]) // se encarga de que se ejecuten ambos
      res.send('Tarea creada correctamente :D')
    } catch (error) {
      console.log(error)
    }
  }
}