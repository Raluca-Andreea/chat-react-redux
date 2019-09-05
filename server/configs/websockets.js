
const User = require("../models/User")

module.exports = (io) =>{
  console.log("Hoy conexion con sockets")


  io.on("connection", socket =>{
    console.log("one user connected")


    socket.on("messageSent", (obj)=>{
        // socket.broadcast.emit("new_message", obj)
        io.emit("messageSent", obj)
    })

    socket.on("connectUser", (user)=> {
      console.log(user)
      User.findOneAndUpdate({username: user.user},{ $set: { connected: true }}, {new: true})
      .then(user => {
        console.log(user)
        // io.emit("connectUser", user)
      })
    })

  })
}
