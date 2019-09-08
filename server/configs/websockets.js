const User = require("../models/User")
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
      console.log(user)
      User.findOneAndUpdate({username: user.user},{ $set: { connected: false }}, {new: true})
      .then(user => {
        console.log(user)
        io.emit("disconnectUser", user)
      })
    })

    socket.on('join', (users) => {

      socket.join(users.userId)

      User.findOne({username: users.loggedInUser})
      .then(user => {

        Room.create({
          sender: new mongoose.Types.ObjectId(user._id),
          reciever: new mongoose.Types.ObjectId(users.userId)
        })
        .then(room => {
          console.log(room)
        })
      })

      io.emit("join", users.userId)
    })


  })
}
