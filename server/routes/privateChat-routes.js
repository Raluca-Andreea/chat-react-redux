const express = require('express');
const privateChatRoutes = express.Router();
const User = require('../models/User');
const Room = require('../models/Room');
const mongoose = require('mongoose');
const Message = require("../models/Message")


privateChatRoutes.get('/allUsers', (req, res, next) => {
  User.find({connected: true})
  .then(users => {
    console.log("SE HAN ENVIADO LOS USER CONECTADOS, INCLUSO EL ULTIMO")
    res.status(200).json(users)
  })
  .catch(err => res.status(401).json(err))
});

// privateChatRoutes.get('/privateChat', (req, res) => {

//   Room.findById(req.query.id)
//   .populate('sender')
//   .populate('reciever')  
//   .then(room => {
//     console.log(room)
//     res.status(200).json(room)
//   })
//   .catch(err => res.status(401).json(err))
// })


privateChatRoutes.get('/allMessages', (req, res) => {

  Room.findById(req.query.id)
  .populate('sender')
  .populate('reciever') 
  .populate({
    path: 'messages',
    populate: { path: 'user' }
}) 
  .then(room => {
    res.status(200).json(room)
  })
  .catch(err => res.status(401).json(err))
})

privateChatRoutes.get('/allRooms', (req, res) => {
      User.findById(req.query.id)
      .populate('messages')
      .populate({
        path: 'privateChats',
        populate: { path: 'sender reciever messages' },
    }) 
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(401).json(err))
})

privateChatRoutes.post('/createRoom', (req, res) => {

  Room.findOne({
    $and : [
      {$or: [{ sender: req.body.loggedInUser }, { sender: req.body.userId }]},
      {$or: [{ reciever: req.body.loggedInUser }, { reciever: req.body.userId }]}
    ]
  })
  .populate('sender')
  .populate('reciever')
  .then((room) => {

    if(!room) {  
      Room.create({
        sender: new mongoose.Types.ObjectId(req.body.loggedInUser),
        reciever: new mongoose.Types.ObjectId(req.body.userId)
      })
      .then(room => {    
        Room.findById(room._id)
        .populate('reciever')
        .populate('sender')
        .then(room => { 
          User.updateMany({_id: {$in: [room.sender, room.reciever]}}, {$push: {privateChats: room._id}}, {new:true})
          .then(users => {
            console.log(room)
           res.status(200).json(room)
          })
              //  User.findByIdAndUpdate(req.body.loggedInUser, {$push: {privateChats: room._id}}, {new:true})
              //  .populate('privateChats')
              //  .then((user) => {
              //    console.log(user)
                //  User.findByIdAndUpdate(room.reciever, {$push: {privateChats: room._id}}, {new:true})
                //  .populate('privateChats')
                //  .then(user => {
                //   console.log(user)
                //   res.status(200).json(room)
                //  })
              //  })
            })
          })
      } else {
        console.log(room)
        res.status(200).json(room)
      }
    })
    .catch(err => res.status(401).json(err))
})

privateChatRoutes.post('/addMessage', (req, res) => {
  
        Message.create({
        message: req.body.message,
        user: new mongoose.Types.ObjectId(req.body.loggedInUser_id)
      })
      .then(msg => {   

        Message.findById(msg._id)
        .populate('user')
        .then(msg => {
                Room.findByIdAndUpdate(req.body.room_id, {$push: {messages: msg._id}}, {new:true})
                .populate('messages')
                .then(room => {  
                  console.log(room) 
                     res.status(200).json({room, msg})                         
                })
                .catch(err => console.log("Error while updating the room", err))
              })
        })
             
      .catch(err => console.log("Error while creating the message", err))
})

module.exports = privateChatRoutes;
