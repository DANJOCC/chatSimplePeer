const { use } = require("../routes/ruta.routes")

const rooms=[]

const newRoom= (room)=>{
    rooms.push(room)
    return room
}


const roomsIsEmpty=()=>{
    return rooms.length==0
}


const getUsers = (id)=>{
   let index= rooms.findIndex( room=> room.id === id)
   return rooms[index].users
}

const getRoom=(roomid)=>{
    return rooms.find(room => room.id===roomid)
}

const getRoomOf=(userID)=>{
    let index

    for (let room = 0; room < rooms.length; room++) {
        let users = rooms[room].users;
        for (let user = 0; user < users.length; user++) {
            if(users[user]==userID){
                index=room
            }
        }
    }

    return index
}

const deleteUser=(userID)=>{
  
    let room=getRoomOf(userID)
    
    rooms[room].users=rooms[room].users.filter(id=>id!==userID)
  
}

const thereIsAroom=(id)=>{
    return getRoom(id)!=undefined
}
const newUser=(userID,roomid)=>{
    let room=getRoom(roomid)
    room.users.push(userID)
    return room 
}

module.exports={
    newRoom,
    getUsers,
    roomsIsEmpty,
    thereIsAroom,
    getRoom,
    newUser,
    deleteUser,
    getRoomOf
}