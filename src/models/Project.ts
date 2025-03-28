import mongoose, {Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";

// schema - de typescript con types!!
// export type ProjectType = Document & { // permite obtener todo el tipado de Docuement

//schema con interface
export interface IProject extends Document { 
  projectName: string
  clientName: string
  description: string
  tasks: PopulatedDoc<ITask & Document>[] // PopulatedDoc trae toda la informacion de ITask y Document, adicionalmente se coloca [] ya que las va a aguardar en una lista - de mongoose

}

// schema de datos con mongoose
const ProjectSchema : Schema = new Schema({
  projectName: {
    type: String, // tipo de dato
    require: true, // requerido
    trim: true, //elimina espacios vacios
  },
  clientName: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  tasks: [
    {
      type: Types.ObjectId,
      ref: 'Task'
    }
  ]
}, {timestamps: true}) //para tomar la fecha

// definir modelo y se registra instancia de mongoose
const Project = mongoose.model<IProject>('Project', ProjectSchema) //conecta el type como generic, y modelo con nombre y el schema

export default Project