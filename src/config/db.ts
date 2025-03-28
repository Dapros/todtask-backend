import mongoose from "mongoose";
import colors from 'colors'
import { exit } from 'node:process';

export const connectDB = async () => {
  try {
    const {connection} = await mongoose.connect(process.env.DATABASE_URL)
    // const url = `${connection.connection.host}:${connection.connection.port}` // evitar doble connection con destructuring
    const url = `${connection.host}:${connection.port}` //url del host con el puerto - host/port

    console.log(colors.magenta.bold(`MongoDB Conectado en: ${url}`))
  } catch (error) {
    console.log(colors.bgRed.bold('Error al conectar'))
    // console.log(error.message)
    // process.exit(1) 
    exit(1) // 1 programa fallo
  }
}