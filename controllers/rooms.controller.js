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
    newUser}