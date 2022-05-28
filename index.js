const http=require('http')
const path=require('path')
const express=require('express')
const app=express()
const {Server}=require('socket.io')

app.set('views', path.join(__dirname,'public'))
app.set('view engine', 'ejs')

app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname,'public')))

app.use(require('routes/rutas.routes'))

const server=http.createServer(app)

const io=new Server(server)




server.listen(app.get('port'),()=>{
    console.log("server on port ", app.get('port'))
})