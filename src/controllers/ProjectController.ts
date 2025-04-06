import type { Request, Response } from "express"
import Project from "../models/Project"

// clase
export class ProjectController {

  // metodo para post - estatico
  static createProject = async (req: Request, res: Response) => {

    const project = new Project(req.body) // forma usando clase 

    // === PARA PROBAR ERRORES - en la carpeta de api/ProjectAPI y pages/projects/CreateProhjectPage ===
    // if(true){ 
    //   const error = new Error('Proyecto no encontrado')
    //   res.status(404).json({error: error.message})
    //   return 
    // }

    try {
      await project.save()
      // await Project.create(req.body) // forma mas simple genera el registro
      res.send('Proyecto creado Correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  // metodo para get - estatico
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({}) // espera con await y encuentra el modelo de Project y almacena en {}
      res.json(projects) // lo convierte a json
    } catch (error) {
      console.log(error)
    }
  }

  // metodo estatico para get por id
  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const project = await Project.findById(id) // permite traer un registro por findById
        .populate('tasks') // para traer toda la info de tasks desde proyecto por Id
      
      //sino existe el ID
      if(!project){
        const error = new Error('Proyecto no encontrado')
        res.status(404).json({error: error.message})
        return 
      }
      res.json(project)
    } catch (error) {
      console.log(error)
    }
  }

  // metodo estatico para Put por id
  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const project = await Project.findById(id) // encontrar registro por id y como segundo parametro el request.body y lo actualizara

      //sino existe
      if(!project){
        const error = new Error('Proyecto no encontrado')
        res.status(404).json({error: error.message})
        return 
      }
      
      project.clientName = req.body.clientName
      project.projectName = req.body.projectName
      project.description = req.body.description

      await project.save()
      res.send('Proyecto Actualizado :D')
    } catch (error) {
      console.log(error)
    }
  }

  // metodo estatico para DELETE por id
  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      // const project = await Project.findByIdAndDelete(id) // econtrar registro por id y luego lo eliminara
      const project = await Project.findById(id) // encuentra por id

      //sino existe
      if(!project){
        const error = new Error('Proyecto no encontrado')
        res.status(404).json({error: error.message})
        return 
      }

      await project.deleteOne() // elimina registro con deleteOne
      res.send('Proyecto Eliminado...')
    } catch (error) {
      console.log(error)
    }
  }

}