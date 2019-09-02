
module.exports = (io) =>{
  console.log("Hoy conexion con sockets")


  io.on("connection", socket =>{
    console.log("one user connected")


    socket.on("messageSent", (obj)=>{
        console.log("MESSAGE FROM CLIENT HIJOPUTAAAAAAAA")
        console.log(obj)

        // socket.broadcast.emit("new_message", obj)
        io.emit("messageSent", obj)
    })

  })
}
