const User = require("../models/User")
const Message = require("../models/Message")
const Room = require("../models/Room")
const mongoose = require('mongoose');

const userSockets = []
module.exports = (io) =>{
  console.log("Hoy conexion con sockets")


  io.on("connection", socket => {
 
    socket.on("messageSent", (obj)=>{
        io.emit("messageSent", obj)
    })

    // socket.on("connectUser", (user)=> {

    //   User.findOneAndUpdate({username: user.user},{ $set: { connected: true }}, {new: true})
    //   .then(user => {
    //     console.log("SE HA CONECTADO " + user)
    //     console.log(socket.id)
    //     io.emit("connectUser", {user})     
    //   })
    //   .catch(err => console.log(err))
    // })

    socket.on("connectUser", (user)=> {
      User.findOneAndUpdate({username: user.user},{ $set: { connected: true, socket: socket.id } }, {new: true})
      .then(user => {
        console.log("SE HA CONECTADO " + user)

        // const obj = {user, socket_id: socket.id}
        io.emit("connectUser", {user})     
      })
      .catch(err => console.log(err))
    })

    // socket.on("disconnectUser", (user)=> {
    //   User.findOneAndUpdate({username: user.user},{ $set: { connected: false }}, {new: true})
    //   .then(user => {
    //     console.log("SE HA DESCONECTADO " + user)
    //     console.log(socket.id)
    //     io.emit("disconnectUser", user)  
    //     socket.conn.close()
    //   })
    //   .catch(err => console.log(err))

    // })

    socket.on("disconnectUser", (user)=> {
      User.findOneAndUpdate({username: user.user},{ $set: { connected: false, socket: "" }}, {new: true})
      .then(user => {
        console.log("SE HA DESCONECTADO " + user)
       
        io.emit("disconnectUser", user)  
        socket.conn.close()
      })
      .catch(err => console.log(err))

    })

    socket.on('join', (obj) => { 
      // console.log(obj)
      socket.join(obj.room_id) 
      // console.log(io.sockets.adapter.rooms)

    })

    socket.on('joinSecondUser', (obj) => {
      // console.log(obj)
      socket.join(obj.room_id)
      // console.log(io.sockets.adapter.rooms)
      socket.emit('joinSecondUser', obj.room_id)
    })

    socket.on('leaveRoom', (obj) => {
      socket.leave(obj.room_id)
      // console.log("HAS LEFT THE ROOM")
      // console.log(obj)
    })

    socket.on('notification', (obj) => {
      User.findById(obj.object.reciever_id)
      .populate({
        path: 'notifications',
        populate: { path: 'messages sender reciever' },
      })
     .then(user => {
        let found 
        if(user.notifications) {
          found = user.notifications.find(room => room._id.toString() === obj.object.room_id)
        }
        socket.broadcast.emit('notification', {found})   
      })
      .catch(err => console.log('no user found ' + err))
    })
    
    socket.on('privateMsg', (obj) => {

      // Object.keys(socket.adapter.rooms).forEach(room => {
      //   console.log(room)
      //   console.log(obj.body.room_id)
      // })
      // console.log(io.sockets.adapter.rooms)

      // let idOfUserB = obj.body.reciever_id
      // let roomID = idOfUserB + '_' + socket.id; // create a unique room id
      // socket.join(obj.body.room_id)

      // User.findByIdAndUpdate(obj.body.reciever_id,{ $set: { socket: socket.id }}, {new: true})
      // .then(user => {

      //   console.log(user)
      //   console.log(socket.id)

      //    io.of('/').in(obj.body.room_id).clients((error, clients) => {
      //       if (error) throw error;
      //       console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
      //     });

      // io.in(obj.body.room_id).emit('privateMsg_update', obj.body.room_id)


      // // io.sockets[user.socket].join(roomID);
      // // io.sockets.in(roomID).emit('privateMsg_update', roomID)
    
      // })
      // .catch(err => console.log(err))

      // console.log(io.sockets.connected)

      // socket.join(obj.body.room_id)
      
      io.of('/').in(obj.body.room_id).clients((error, clients) => {
        if (error) throw error;
        console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
      });
      // console.log(obj.body.room_id)
      // console.log(io)
      // console.log(obj)
      io.in(obj.body.room_id).emit('privateMsg_update', obj.body.room_id)
      // socket.to(obj.body.room_id).emit('privateMsg', obj.body.room_id)
      // io.sockets[idOfUserB].join(roomID);
      // io.sockets.in(roomID).emit('privateMsg_update', roomID)
      // console.log(obj.body.reciever_id)
      // console.log(obj.body.socket_id)
      // console.log(socket.id)


      
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
