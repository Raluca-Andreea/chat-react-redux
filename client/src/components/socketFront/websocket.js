import io from "socket.io-client"

export default class SocketConnection{
    constructor(){
        // this.socket = io("http://192.168.20.82:5000")
        this.socket = io("http://localhost:5000")

    }

  sendMsg = (message, user)=> {
      this.socket.emit("messageSent", {message, user})     
  }
}

