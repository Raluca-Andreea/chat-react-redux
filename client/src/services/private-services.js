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
 
}