const socket = io('/')
const myPeer = new Peer()


const mirror=document.getElementById("mirror")
const myVideo=document.createElement('video')
myVideo.muted = true


function addVideoStream(video, stream){
    video.srcObject = stream 
    video.addEventListener('loadedmetadata', () => { // Play the video as it loads
        video.play()
    })
    mirror.append(video)}


function connectToNewUser(userId, stream) {
        const call = myPeer.call(userId, stream)
        const video = document.createElement('video') 
        call.on('stream', userVideoStream => {
            console.log("recibiendo stream") 
            addVideoStream(video, userVideoStream)
        })
        call.on('close', () => {
            video.remove()
        })
    }

myPeer.on('open', id => {
        socket.emit('join-room', ROOM_ID, id)
        console.log("peer establecido")
})

navigator.mediaDevices.getUserMedia({
    video: true,
    audio:true
}).then(stream=>{
    addVideoStream(myVideo,stream)

    myPeer.on('call', call => { 
        call.answer(stream) 
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            
            addVideoStream(video, userVideoStream)
        })
    })


    socket.on('user-connected', userId => {
        console.log("usuario conectado") // If a new user connect
        connectToNewUser(userId, stream) 
    })

    socket.on('user-disconnected', userId => {
        console.log(userId)
    })

})


