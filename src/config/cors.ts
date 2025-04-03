import { CorsOptions } from 'cors'

export const corsConfig : CorsOptions = {
  origin: function(origin, callback) {
    const whiteliste = [process.env.FRONTEND_URL]

    if(whiteliste.includes(origin)) { // si se esta ejecutando de la lista blanca
      callback(null, true) //permitimos la conexion
    } else {
      callback(new Error('Error de CORS'))
    }
  }
}