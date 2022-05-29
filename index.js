const http=require('http')
const path=require('path')
const express=require('express')
const app=express()
const {Server}=require('socket.io')
const {newRoom,getUsers,roomsIsEmpty,thereIsAroom,getRoom, newUser, getRoomOf, deleteUser}=require("./controllers/rooms.controller")
const { disconnect } = require('process')


app.set('views', path.join(__dirname,'public'))
app.set('view engine', 'ejs')

app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname,'public')))

app.use(require('./routes/ruta.routes'))

const server=http.createServer(app)

const io=new Server(server)

io.on("connection", socket =>{
    socket.on("join room", roomid=>{
        let room
        if(thereIsAroom(roomid)){
           
         
          if(getRoom(roomid).users.length===4){
              socket.emit("full room")
              return
          }
            socket.join(roomid)
            room=newUser(socket.id,roomid)

        }
        else{

            room=newRoom({
                id:roomid,
                 users:[socket.id]
            })
            
        
            
        }

        let usersToConnect = room.users.filter(id=> id !== socket.id)

           
        socket.emit('all users', usersToConnect)
    })

    socket.on("sending signal", payload => {
        io.to(payload.userId).emit('user joined', { signal: payload.signal, callerId: payload.callerId });//emito a los usuarios los datos del peer
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerId).emit('receiving returned signal', { signal: payload.signal, id: socket.id });//envio los datos del peer al nuevo usuario
    });

    socket.on("disconnect", ()=>{
        deleteUser(socket.id) 
        
    })
})

server.listen(app.get('port'),()=>{
    console.log("server on port ", app.get('port'))
})