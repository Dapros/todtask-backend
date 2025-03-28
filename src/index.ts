import colors from 'colors'
import server from './server'

// puerto
const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log( colors.cyan.bold(`REST API funcionando en el puerto ${port}`))
})