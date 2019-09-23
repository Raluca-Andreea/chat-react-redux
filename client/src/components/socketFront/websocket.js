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
    this.socket.open()
    this.socket.emit("connectUser", {user})
  }
  disconnectUser = (user) => {
    this.socket.emit("disconnectUser", {user})
    this.socket.close()
  }
  joinRoom = (room_id) => {
    this.socket.emit('join', {room_id})
  }
  sendPrivateMsg = (room_id, reciever_id, socket_id) => {
    const body = {
      room_id, reciever_id, socket_id
    }
    this.socket.emit('privateMsg', {body})
  }
  
}

