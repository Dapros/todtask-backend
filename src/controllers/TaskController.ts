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
      res.status(500).json({error: 'Hubo un error :c'})
    }
  }

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({project: req.project.id}) // como decir WHERE project.id
        .populate('project') // traemos toda la informacion con populate
      res.json(tasks)
    } catch (error) {
      res.status(500).json({error: 'Hubo un error :c'})
    }
  }

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params // extrae taskId de los parametros del reques desde routes
      const task = await Task.findById(taskId) // si encuentra por Id el mismo del parametro lo almacena en task
      if(!task){ // sino existe lanza error y un status 404
        const error = new Error('Tarea no encontrada')
        res.status(404).json({error: error.message})
        return
      }

      // console.log(task.project.toString()) // muestra el id como objectId - se transforma a string con toString
      // console.log(req.project.id)

      // si la tarea no pertenece a un proyecto
      if(task.project.toString() !== req.project.id){
        const error = new Error('Accion no valida')
        res.status(400).json({error: error.message})
        return
      }
      res.json(task) // si existe lo devuelve como json
    } catch (error) {
      res.status(500).json({error: 'Hubo un error :c'})
    }
  }

}