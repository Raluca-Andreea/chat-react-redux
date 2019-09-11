import io from "socket.io-client"

export default class SocketConnection{
    constructor(){
        this.socket = io("http://192.168.100.192:5000")
        // this.socket = io("http://localhost:5000")
    }
    
  sendMsg = (message, user)=> {
      this.socket.emit("messageSent", {message, user})     
  }
  connectUser = (user) => {
      this.socket.emit("connectUser", {user})
  }
  disconnectUser = (user) => {
    this.socket.emit("disconnectUser", {user})
  }
  joinRoom = (room_id) => {
    this.socket.emit('join', {room_id})
  }
  sendPrivateMsg = (room_id)    => {
    this.socket.emit('privateMsg', {room_id})
  }
  
}

