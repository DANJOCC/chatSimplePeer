const http=require('http')
const path=require('path')
const express=require('express')
const app=express()
const {Server}=require('socket.io')
const {newRoom,getUsers,roomsIsEmpty,thereIsAroom,getRoom, newUser}=require("./controllers/rooms.controller")


app.set('views', path.join(__dirname,'public'))
app.set('view engine', 'ejs')

app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname,'public')))

app.use(require('routes/rutas.routes'))

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
            
            let usersToConnect = room.users.filter(id=> id !== socket.id)

            socket.emit('all users', usersToConnect)

        }
        else{

            newRoom({
                id:roomid,
                 users:[]
            })

            socket.join(roomid)
            
        }
    })
})

server.listen(app.get('port'),()=>{
    console.log("server on port ", app.get('port'))
})