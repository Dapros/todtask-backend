import mongoose, {Schema, Document, Types} from "mongoose";


const taskStatus = {
  PENDING: 'pending',
  ON_HOLD: 'onHold',
  IN_PROGRESS: 'inProgress',
  UNDER_REVIEW: 'underReview',
  COMPLETED: 'completed'
} as const //Agrega readonly que no se pueden modificar solo leer

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus] // en lista para que solo tome los valores de taskStatus


// interface de task
export interface ITask extends Document { 
  name: string //string con s minuscula porque es de typescript
  description: string
  project: Types.ObjectId // project de tipo ObjectId de mongoose - Que sera el ID del proyecto para relacionar tarea a projecto
  status: TaskStatus
}

// schema
export const TaskSchema : Schema = new Schema({
  name: {
    type: String, // string con S en mayuscula porque es de mongoose
    trim: true,
    require: true
  },
  description: {
    type: String, // string con S en mayuscula porque es de mongoose
    trim: true,
    require: true
  },
  project: {
    type: Types.ObjectId,
    ref: 'Project' //referencia sera el modelo de Project en Project.ts
  },
  status: {
    type: String,
    enum: Object.values(taskStatus), // para que solo tome los valores del diccionario de estados
    default: taskStatus.PENDING // estado por defecto, aqui se genera la tarea nueva
  }
}, {timestamps: true})

//conectar schema con el interface
const Task = mongoose.model<ITask>('Task', TaskSchema)

export default Task