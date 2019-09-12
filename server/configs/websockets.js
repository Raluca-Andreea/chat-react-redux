const User = require("../models/User")
const Message = require("../models/Message")
const Room = require("../models/Room")
const mongoose = require('mongoose');


module.exports = (io) =>{
  console.log("Hoy conexion con sockets")


  io.on("connection", socket =>{
    console.log("one user connected")


    socket.on("messageSent", (obj)=>{
        // socket.broadcast.emit("new_message", obj)
        io.emit("messageSent", obj)
    })

    socket.on("connectUser", (user)=> {

      User.findOneAndUpdate({username: user.user},{ $set: { connected: true }}, {new: true})
      .then(user => {
        console.log("SE HA ACTUALIZADO EL USER" + user)
        io.emit("connectUser", user)
      })
    })

    socket.on("disconnectUser", (user)=> {
    
      User.findOneAndUpdate({username: user.user},{ $set: { connected: false }}, {new: true})
      .then(user => {
        console.log(user)
        io.emit("disconnectUser", user)
        socket.close()
      })
    })

    socket.on('join', (obj) => {   
      socket.join(obj.room_id)  
      io.in(obj.room_id).emit('join_update', obj.room_id)
    })
    
    socket.on('privateMsg', (obj) => {
      socket.join(obj.room_id)
      io.in(obj.room_id).emit('privateMsg_update', obj.room_id)
    })

    


  })
}
