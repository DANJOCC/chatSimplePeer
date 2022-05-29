var Peer = require('simple-peer')
const socket = io('/')
const peers=[]


const mirror=document.getElementById("mirror")
const myVideo=document.createElement('video')
myVideo.muted = true


function addVideoStream(video, stream){
    video.srcObject = stream 
    video.addEventListener('loadedmetadata', () => { // Play the video as it loads
        video.play()
    })
    mirror.append(video)
}


function createPeer(userId, callerId ,stream) {
       const peer=new Peer({
        initiator: true,
        trickle: false,
        stream
       })

       peer.on('Signal', signal=>{
           socket.emit('Sending signal',{userId,callerId,signal})
       })

       return peer
}

function addPeer(incomingSignal, callerId, stream){
    const peer=new Peer({
        initiator: false,
        trickle: false,
        stream
       })

    peer.on('Signal', signal=>{
        socket.emit('Returning signal',{signal,callerId})
    })

    peer.signal(incomingSignal)

    return peer

}

navigator.mediaDevices.getUserMedia({
    video: true,
    audio:true
}).then(stream=>{
    addVideoStream(myVideo,stream)

    socket.emit("join room", ROOM_ID)

    socket.on("full room", room=>{
        alert("Sala ocupada")
        fetch("/")
    }
    )

    socket.on("all users", users=>{
        console.log(users)
    })
   /* socket.on("all users", users=>{
            users.forEach(userID => {
                const peer= createPeer(userId,socket.id,stream)
                peers.push({
                    peerID:userID,
                    peer,
                })
            });

    })

    socket.on("user joined", payload=>{
        const peer= addPeer(payload.signal,payload.callerId,stream)
        peers.push({
            peerID:payload.callerId,
            peer,
        })
    })

    socket.on("Receiving returned signal", payload=>{
        const item=peers.find(p => p.peerID===payload.id)
        item.peer.signal(payload.signal)
    })*/
   
})


