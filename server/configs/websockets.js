const User = require("../models/User")
const Message = require("../models/Message")
const Room = require("../models/Room")
const mongoose = require('mongoose');


module.exports = (io) =>{
  console.log("Hoy conexion con sockets")


  io.on("connection", socket => {
 
    socket.on("messageSent", (obj)=>{
        io.emit("messageSent", obj)
    })

    socket.on("connectUser", (user)=> {

      User.findOneAndUpdate({username: user.user},{ $set: { connected: true }}, {new: true})
      .then(user => {
        console.log("SE HA CONECTADO " + user)
        console.log(socket.id)
        io.emit("connectUser", user)     
      })
      .catch(err => console.log(err))
    })

    socket.on("disconnectUser", (user)=> {
      User.findOneAndUpdate({username: user.user},{ $set: { connected: false }}, {new: true})
      .then(user => {
        console.log("SE HA DESCONECTADO " + user)
        console.log(socket.id)
        io.emit("disconnectUser", user)  
        socket.conn.close()
      })
      .catch(err => console.log(err))

    })

    // socket.on('join', (obj) => {  

    // Object.values(io.sockets.sockets).forEach(client => {
    //   console.log(client.id)
    //   console.log(client.client.id)

    // })
    //   // socket.join(obj.room_id)   
    //   console.log(socket.id)  
    //   io.emit('join', obj)   
    //   // io.in(obj.room_id).emit('join_update', obj.room_id)
    // })
    
    socket.on('privateMsg', (obj) => {
      // let idOfUserB = obj.reciever_id
      // let roomID = idOfUserB + '_' + socket.id; // create a unique room id

      // socket.join(roomID)
   
      // io.sockets[idOfUserB].join(roomID);
      // io.sockets.in(roomID).emit('privateMsg_update', roomID)

      socket.join(obj.room_id)
      io.in(obj.room_id).emit('privateMsg_update', obj.room_id)
      
      // socket.to(obj.room_id).emit('privateMsg_update', obj.room_id)
      // io.sockets.in(obj.room_id).emit('privateMsg_update', obj.room_id);
      // io.emit("new_privateMsg", obj.room_id)
      // socket.broadcast.to(obj.room_id).emit('privateMsg_update', obj.room_id)
    })

    socket.on("disconnect", () => {
      console.log("USER DISCONNECTED!!!!")
  })

    


  })
}
