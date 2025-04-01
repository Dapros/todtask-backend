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
      res.json(req.task) // si existe lo devuelve como json
    } catch (error) {
      res.status(500).json({error: 'Hubo un error :c'})
    }
  }

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name
      req.task.description = req.body.description
      await req.task.save()
      res.send('Tarea Actualizada Correctamente :D') 
    } catch (error) {
      res.status(500).json({error: 'Hubo un error :c'})
    }
  }

  static deleteTask = async (req: Request, res: Response) => {
    try {
      req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString()) // filtrara lo que tiene el arreglo de project.task menos el taskId, es decir lo va a limpiar de la lista

      // await task.deleteOne() // luego de encontrar id y pasar las validaciones lo eliminara con deleteOne
      // await req.project.save()
      await Promise.allSettled([req.task.deleteOne(), req.project.save()]) // para evitar doble await

      res.send('Tarea ELIMINADA! Correctamente :D') 
    } catch (error) {
      res.status(500).json({error: 'Hubo un error :c'})
    }
  }

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body
      req.task.status = status
      await req.task.save()
      res.send('Estado Actualizado')
    } catch (error) {
      res.status(500).json({error: 'Hubo un error :c'})
    }
  }
}