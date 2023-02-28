//? Dependecias
import express from 'express';
// import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import FileStore from 'session-file-store';
import mongoStore from 'connect-mongo'

//? Personalizados 
import { __dirname } from './utils.js';
import './dbConfig.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import messagesRouter from './routes/messages.router.js'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'
import { messagesModel } from './dao/models/messages.model.js';


const app = express()


//?  Seteo de aplicacion
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())

//? Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//? Rutas
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/messages', messagesRouter)
app.use('/views', viewsRouter)
app.use('/users', usersRouter)

//? Ruta raiz
app.get('/', (req, res) => {
    res.render('layouts/main')
})

//? Session Mongo
app.use(
    session({
        store: new mongoStore({
            mongoUrl: "mongodb+srv://matuDev2505:w8YEfwAn4dw9jCNF@matudevcluster.hyuyofr.mongodb.net/ecommerce?retryWrites=true&w=majority"
        }),
        resave: false,
        saveUninitialized: false,
        secret: 'sessionKey',
        cookie: { max: 30000 }
    }))


const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT} => http://localhost:8080`)
})


//? Sockets
// const mensajes = []

// const httpServer = app.listen(PORT, () => {
//     console.log(`Escuchando al puerto ${PORT} => http://localhost:8080`)
// })

// const socketServer = new Server(httpServer)

// socketServer.on('connection', (socket) => {
//     console.log(`Usuario conectado: ${socket.id}`)

//     socket.on('disconnect', () => {
//         console.log('Usuario desconectado')
//     })

//     socket.on('mensaje', info => {
//         mensajes.push(info)
//         socketServer.emit('chat', mensajes)
//         async function addMsg() {
//             try {
//                 const newMsg = await messagesModel.create(info)
//                 return newMsg
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         addMsg()
//         console.log(info)
//     })

//     socket.on('nuevoUsuario', usuario => {
//         socket.broadcast.emit('broadcast', usuario)
//     })
// })














