import axios from 'axios'

export default class prServices {
  constructor () {
    this.service = axios.create({
      // baseURL: 'http://localhost:5000/api/',
      baseURL: 'http://192.168.100.192:5000/api/',
      withCredentials: true
    })
  }  
  
  getAllUsers = () => this.service.get('allUsers')

  getPrivateChat = (room_id) => this.service.get('allMessages', { params: {id: room_id}})
  
  
  getAllRooms = (user_id) => this.service.get('allRooms', { params: {id: user_id}})
  createRoom = (userId, loggedInUser) => this.service.post('createRoom', {userId, loggedInUser})

  createMessage = (message, loggedInUser_id, loggedInUser, room_id)  => this.service.post('addMessage', {message, loggedInUser_id,loggedInUser, room_id})

 
}